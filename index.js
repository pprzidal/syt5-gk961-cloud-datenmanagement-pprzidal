const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

if (process.argv[2] == undefined || (port = Number.parseInt(process.argv[2])) == NaN) {
    console.log("Provide a port for the app to run on\nLike \"nodejs index.js 4000\" for example");
    process.exit(1);
}

app.put('/register', (req, res) => {

})

app.post('/login', async (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Login system listening on http://localhost:${port}`)
})