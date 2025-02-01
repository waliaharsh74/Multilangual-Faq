import dotenv from 'dotenv';
dotenv.config();
const key = process.env.TRANSLATION_CLOUD_KEY

import Translations from '@google-cloud/translate';
const translate = new Translations.v2.Translate({ key });


async function TranslateTo(orignalQuestion: string, orignalAnswer: string, target: string) {
    const [question] = await translate.translate(orignalQuestion, target);
    const [answer] = await translate.translate(orignalAnswer, target);

    return { question, answer }
}

async function getLanguages() {
    const languages = await translate.getLanguages()
    return languages
}
async function detectLanguage(text: string) {
    let [detections] = await translate.detect(text);

    console.log(detections);
}

export { TranslateTo, getLanguages, detectLanguage }