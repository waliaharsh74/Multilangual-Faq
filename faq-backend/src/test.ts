import request from 'supertest';
import app from './index';
import prisma from './prisma-client';
import redis from './redisClient';

jest.mock('../prisma-client');
jest.mock('../redisClient');

describe('Test API Routes', () => {

    beforeEach(() => {
        (prisma.language.findMany as jest.Mock).mockResolvedValue([{ lang: 'en' }, { lang: 'es' }]);
        (prisma.fAQ.findMany as jest.Mock).mockResolvedValue([]);
        (redis.get as jest.Mock).mockResolvedValue(null);
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    test('POST /languages should insert languages', async () => {
        const mockLanguages = [{ lang: 'en' }, { lang: 'es' }, { lang: 'de' }];
        (prisma.language.createMany as jest.Mock).mockResolvedValue({ count: 3 });
        jest.mock('../utils/translate', () => ({
            getLanguages: jest.fn().mockResolvedValue([mockLanguages]),
        }));

        const response = await request(app).post('/api/languages').send();

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Insertion complete');
        expect(response.body.Languages).toEqual(mockLanguages);
    });

    test('GET /languages should fetch languages', async () => {
        const mockLanguages = [{ lang: 'en' }, { lang: 'es' }];
        (prisma.language.findMany as jest.Mock).mockResolvedValue(mockLanguages);

        const response = await request(app).get('/api/languages');

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('All Languages are Fetched Successfully');
        expect(response.body.Languages).toEqual(mockLanguages);
    });

    test('GET /get-faqs should fetch FAQs', async () => {
        const mockFaqs = [
            { question: 'What is Jest?', answer: 'A testing framework' }
        ];
        (prisma.fAQ.findMany as jest.Mock).mockResolvedValue(mockFaqs);

        const response = await request(app).get('/api/get-faqs?lang=en');

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('translation Successfull');
        expect(response.body.result).toEqual(mockFaqs);
    });

    test('POST /create-faq should create a new FAQ', async () => {
        const newFAQ = {
            userInput: {
                languageCode: 'en',
                question: 'What is Jest?',
                answer: 'A testing framework'
            }
        };

        (prisma.language.findUnique as jest.Mock).mockResolvedValue({ id: 1, code: 'en' });
        (prisma.fAQ.create as jest.Mock).mockResolvedValue({
            id: 1,
            question: 'What is Jest?',
            answer: 'A testing framework',
            translations: [{ languageCode: 'en', question: 'What is Jest?', answer: 'A testing framework' }]
        });

        const response = await request(app).post('/api/create-faq').send(newFAQ);

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Created FAQ Successfully!');
    });

    test('DELETE /delete-faq/:id should delete an FAQ', async () => {
        (prisma.fAQTranslation.delete as jest.Mock).mockResolvedValue({ id: 1 });

        const response = await request(app).delete('/api/delete-faq/1');

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('FAQ Deleted Successfully');
    });

});
