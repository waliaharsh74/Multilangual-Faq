import express, { Request, Response, Router } from "express"
import { getLanguages, TranslateTo } from "../utils/translate";
import prisma from "../prisma-client";
import redis from '../redisClient';
const routes: Router = express.Router();

interface lang {
    lang: string
}
interface FAQInput {
    languageCode: string;
    question: string;
    answer: string;
}
routes.post('/languages', async (req: Request, res: Response) => {
    try {
        const [Languages] = await getLanguages()

        const data = await prisma.language.createMany({
            data: Languages,
            skipDuplicates: true
        })
        console.log(data);
        res.status(200).json({
            msg: "Insertion complete",
            Languages
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})
routes.get('/languages', async (req: Request, res: Response) => {
    try {
        const Languages = await prisma.language.findMany()
        res.status(200).json({
            msg: "All Languages are Fetched Successfully",
            Languages
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})
routes.get('/get-faqs', async (req: Request<{}, {}, {}, lang>, res: Response) => {
    try {
        const requestedLangCode = req.query.lang || "en";

        const targetLanguage = await prisma.language.findUnique({
            where: { code: requestedLangCode }
        });

        if (!targetLanguage) throw new Error("Unsupported language");
        const cacheKey = `faqs_${requestedLangCode}`;
        const cachedFaqs = await redis.get(cacheKey);

        if (cachedFaqs) {
            res.status(200).json({ msg: "Cached FAQs", result: JSON.parse(cachedFaqs) });
            return
        }

        const faqs = await prisma.fAQ.findMany({
            include: {
                translations: {
                    where: {
                        languageCode: {
                            in: [requestedLangCode, 'en']
                        }
                    }
                }
            }
        });
        const result = await Promise.all(faqs.map(async (faq) => {

            const existingTranslation = faq.translations.find(
                t => t.languageCode === requestedLangCode
            );

            if (existingTranslation) return existingTranslation;


            const englishTranslation = faq.translations.find(
                t => t.languageCode === 'en'
            );

            if (!englishTranslation) return null;


            const translatedContent = await TranslateTo(
                englishTranslation.question,
                englishTranslation.answer,
                requestedLangCode
            );

            const newTranslation = await prisma.fAQTranslation.create({
                data: {
                    faqId: faq.id,
                    languageId: targetLanguage.id,
                    languageCode: targetLanguage.code,
                    isMachineTranslated: true,
                    ...translatedContent
                }
            });

            return newTranslation;
        }));

        await redis.set(cacheKey, JSON.stringify(result.filter(Boolean)), 'EX', 3600);
        res.status(200).json({
            msg: "translation Successfull",
            result: result.filter(Boolean)
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})
routes.post('/create-faq', async (req: Request, res: Response) => {
    try {



        const { userInput }: { userInput: FAQInput } = req.body
        const inputLanguage = await prisma.language.findUnique({
            where: { code: userInput.languageCode }
        });

        if (!inputLanguage) throw new Error("Invalid language code");


        const faq = await prisma.fAQ.create({
            data: {
                translations: {
                    create: [{
                        languageId: inputLanguage.id,
                        languageCode: inputLanguage.code,
                        question: userInput.question,
                        answer: userInput.answer
                    }]
                }
            },
            include: { translations: true }
        });


        const englishLanguage = await prisma.language.findUnique({
            where: { code: 'en' }
        });
        if (!englishLanguage) throw new Error("Db is not updated with with english Language")

        if (!faq.translations.some(t => t.languageCode === 'en')) {
            const englishTranslation = await TranslateTo(
                userInput.question,
                userInput.answer,
                'en'
            );

            await prisma.fAQTranslation.create({
                data: {
                    faqId: faq.id,
                    languageId: englishLanguage.id,
                    languageCode: 'en',
                    question: englishTranslation.question,
                    answer: englishTranslation.answer,
                    isMachineTranslated: true
                }
            });
        }

        await redis.del('faqs_en');
        res.status(200).json({
            msg: "Created FAQ Successfully!",
            faq
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
routes.delete('/delete-faq/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const faqToDelete = await prisma.fAQTranslation.delete({ where: { id } });
        console.log(faqToDelete);
        if (!faqToDelete) {
            res.status(404).json({ error: "FAQ not found" });
            return
        }
        await redis.del('faqs_en');
        res.status(200).json({ msg: "FAQ Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default routes
