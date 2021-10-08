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
        res.send("Please provice name, email, password\n")
    }
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        console.log(hash.length)
        //const [new_user] = await sql`INSERT INTO users VALUES (${req.body.email}, ${req.body.name}, ${hash});`
    });
    console.log(`${req.body.name}, ${req.body.email}, ${req.body.password}`)
    res.end()
})

app.post('/login', async (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Login system listening on http://localhost:${port}`)
})