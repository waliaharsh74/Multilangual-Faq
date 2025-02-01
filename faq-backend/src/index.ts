import express from "express"
import cors from "cors"
import routes from "./routes"
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT


async function main() {
    const app = express();

    app.use(cors())
    app.use(express.json())
    app.use('/api/v1', routes)

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}
main()