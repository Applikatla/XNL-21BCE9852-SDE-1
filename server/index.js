import json  from 'body-parser';
import express from 'express';
import cors from 'cors';
import {pool} from './db.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const port = 8000;

const app = express();

app.use(cors());

app.use(express.json());


app.post("/submit", async (req, res) => {
    try {
        const { addressTo, amount, keyword, message } = req.body;
        const addToDB = await pool.query("INSERT INTO TRANSACTION_LOG (address_to, amount, keyword, message) VALUES($1, $2, $3, $4)", 
            [addressTo, amount, keyword, message]);
        res.json(addToDB);
    } catch (error) {
        console.log(error);
    }
});

app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const dbData = await pool.query("SELECT * FROM USER_DATA WHERE email = ($1)", [email]);
        if (dbData.rows.length > 0) {
            return res.json({ message: "user already existed" });
        }
        else {
            const hashPass = await bcrypt.hash(password, 10);
            const addToDb = await pool.query("INSERT INTO USER_DATA(email, password) VALUES($1, $2)", 
            [email, hashPass]);
            return res.json(addToDb);
        }
    } catch (error) {
        console.log(error);
    }
})

app.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const dbData = await pool.query("SELECT * FROM USER_DATA WHERE EMAIL = $1", [email]);
        if (dbData.rows.length === 0) {
            return res.json({ message: "user dose not exist please sigin" });   
        }
        else {
            const isPassMatch = await bcrypt.compare(password, dbData.rows[0].password);
            if (!isPassMatch) {
                res.json({ message: "Password/user incorrect" });
            }
            else {
                const token = jwt.sign({id: dbData.rows[0].id}, process.env.JWT_KEY, { expiresIn: '15min' })
                res.status(201).json({ token: token });
            }
        }
    } catch (error) {
        console.log(error);
    }
})
app.get("/", async (req, res) => {
    try {
        const showAllDB = await pool.query('SELECT * FROM TRANSACTION_LOG');
        const showUserDb = await pool.query("SELECT * FROM USER_DATA");
        res.json({keys: showAllDB.rows, users: showAllDB.rows});
        // res.json("......................................................");
        // res.json(showUserDb.rows);
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log("server stated");
});