const path = require('path');
var express = require('express')
const app = express();
const publicPath = path.join(__dirname, '..', 'public')
const port = 3000;

app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.send("Test");
})

app.listen(port, () => {
    console.log(`Server Up for port: ${port}`);
});

