const express = require("express");
const infoFile = require("fs");
const path = require("path");

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/front.html"));
});

app.post("/save", (req, res) => {
    const hero = JSON.parse(JSON.stringify(req.body));
    if ("age" in hero && "name" in hero) {
        infoFile.writeFileSync("infoFile.txt", JSON.stringify(req.body));
        res.status(204).send();
    } else {
        res.status(400).send();
    }
});

app.listen(PORT, () => {
    console.log("server has been started");
});
