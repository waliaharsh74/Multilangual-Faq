import Redis from "ioredis"
import dotenv from 'dotenv';
dotenv.config();

const redislUrl = process.env.REDIS_URL!
const redis = new Redis(redislUrl);
export default redis