const express = require('express');
const bcrypt = require('bcrypt');
const postgres = require('postgres');
const fs = require('fs');
const http = require('http');
const https = require('https');
const saltOrRounds = 10;

if (process.env.POSTGRES_USER === undefined || process.env.POSTGRES_PASSWORD === undefined) {
    console.log("Please provide me with the username and password of the Postgres Database users")
    process.exit(2)
}

const app = express();
app.use(express.urlencoded({extended: true}));
const sql = postgres({
    host: 'db', // <-- das ist ziemlich cool, einfach nur den namen von dem service aus dem docker-compose.yml schreiben.
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'loginsystem'
})  

//TODO kinda unsauber
/*if (process.argv[2] == undefined || (port = Number.parseInt(process.argv[2])) == NaN) {
    console.log("Provide a port for the app to run on\nLike \"nodejs index.js 4000\" for example");
    process.exit(1);
}*/

app.put('/register', (req, res) => {
    if (req.body.name === undefined || req.body.email === undefined || req.body.password === undefined) {
        res.status(400).send("Please provide name, email and password\n")
        res.end()
    } else {
        // Hier wird ein gesalzen und gehashed
        bcrypt.hash(req.body.password, saltOrRounds, async (err, hash) => {
            try { // TODO probieren ob eine SQL Injection möglich ist
                await sql`INSERT INTO users (email, name, password) VALUES (${req.body.email}, ${req.body.name}, ${hash});`
                res.status(200).send("Account created succesfully\n");
            } catch (e) {
                console.log(e.message)
                if (e.message.includes("duplicate key value violates unique constraint \"users_email_key\"")) res.status(400).send(e.detail + "\n");
                else if (e.message.includes("connect EHOSTUNREACH") || e.message.includes("connect ETIMEDOUT")) res.status(500).send("We have trouble connecting to the database\n");
            } finally {
                res.end()
            }
        });
    }
})

app.post('/login', async (req, res) => {
    if (req.body.email === undefined || req.body.password === undefined) {
        res.status(400).send("Please provide email and password\n")
        res.end()
    }
    try {
        const user = await sql`SELECT password, name FROM users WHERE email = ${req.body.email};`
        if (user.length == 0) res.status(400).send("User doesnt exist\n")
        else if (await bcrypt.compare(req.body.password, user[0].password)) res.status(200).send(`Welcome ${user[0].name}\n`)
        else res.status(400).send("Wrong password\n")
    } catch (e) {
        if (e.message.includes("connect EHOSTUNREACH")) res.status(500).send("We have trouble connecting to the database\n");
    } finally {
        res.end()
    }
})

http.createServer(app).listen(8080);
https.createServer({key: fs.readFileSync("./selfsigned.key", "utf8"), cert: fs.readFileSync("./selfsigned.crt")}, app).listen(8443);