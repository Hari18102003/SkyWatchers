import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.API_URL;
const api_key = process.env.API_KEY;

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
const day = String(today.getDate()).padStart(2, '0');
const todayDate = `${year}-${month}-${day}`;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(url + "?date=" + todayDate + "&api_key=" + api_key);
        const result = response.data;
        const tt = result.title;
        const dd = result.date;
        const cc = result.explanation;
        const image_url = result.url;
        res.render("index.ejs", {
            title: tt,
            content: cc,
            date: dd,
            url: image_url
        });
    }
    catch (error) {
        console.error(error.message);
        res.sendStatus(500);
    }
});

let err;
app.post("/", async (req, res) => {
    const date = req.body.date;
    try {
        const response = await axios.get(url + "?date=" + date + "&api_key=" + api_key);
        const result = response.data;
        res.render("index.ejs", {
            title: result.title,
            content: result.explanation,
            date: result.date,
            url: result.url
        });
    }
    catch (error) {

        const response = await axios.get(url + "?date=" + todayDate + "&api_key=" + api_key);
        const result = response.data;
        const tt = result.title;
        const dd = result.date;
        const cc = result.explanation;
        const image_url = result.url;
        res.render("index.ejs", {
            title: tt,
            content: cc,
            date: dd,
            url: image_url,
            err: "Date must be between 1995-06-16 and " + todayDate + "."
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});