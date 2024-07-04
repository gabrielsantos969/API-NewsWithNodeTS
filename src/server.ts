import app from "./app";
import dotenv from 'dotenv';
dotenv.config();

const PORT = parseInt(`${process.env.SERVER_PORT} || 3000`);
const HOST = process.env.SERVER_HOST || 'http://localhost'

app.listen(PORT, () => console.log(`Server is running at ${HOST}:${PORT}`));