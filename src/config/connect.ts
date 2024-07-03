import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const con = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_DATABASE || 'news',
    port: Number(process.env.DB_PORT) || 3306
})

export default con;