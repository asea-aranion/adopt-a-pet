const express = require("express");
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get("/", (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Welcome!</h1>
            </body>
        </html>
        
        `);
})

app.get("/hello-world", (req, res) => {
    res.send("Hello, World!");
})

app.get("/hello-pet", (req, res) => {
    res.send("Hello, Pet!");
})