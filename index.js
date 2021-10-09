const express = require('express');
const bcrypt = require('bcrypt');
const postgres = require('postgres')

const app = express();
app.use(express.urlencoded({extended: true}));
const sql = postgres({
    host: '172.17.0.2',
    username: 'postgres',
    password: 'root', // TODO <-- nicht gut
    database: 'loginsystem'
})  

//TODO kinda unsauber
if (process.argv[2] == undefined || (port = Number.parseInt(process.argv[2])) == NaN) {
    console.log("Provide a port for the app to run on\nLike \"nodejs index.js 4000\" for example");
    process.exit(1);
}

app.put('/register', (req, res) => {
    if (req.body.name === undefined || req.body.email === undefined || req.body.password === undefined) {
        res.status(400).send("Please provide name, email and password\n")
        res.end()
    } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            try { // TODO probieren ob eine SQL Injection möglich ist
                await sql`INSERT INTO users (email, name, password) VALUES (${req.body.email}, ${req.body.name}, ${hash});`
                res.status(200).send("Account created succesfully");
            } catch (e) {
                console.log(e.message)
                if (e.message.includes("duplicate key value violates unique constraint \"users_email_key\"")) res.status(400).send(e.detail + "\n");
                else if (e.message.includes("connect EHOSTUNREACH")) res.status(500).send("We have trouble connecting to the database\n");
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

app.listen(port, () => {
    console.log(`Login system listening on http://localhost:${port}`)
})