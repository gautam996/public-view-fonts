const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname + '/public'));

let html = fs.readFileSync('./templates/app.html').toString();
let newCards = fs.readFileSync('./modules/card.html').toString();
let fontFace = fs.readFileSync('./modules/font-face.txt').toString();

// Create JSON local-fonts.json
const createJSONFile = () => {
    const fontArr = [];
    const fontDirectory = './public/fonts';

    fs.readdirSync(fontDirectory).forEach((node) => {
        fontArr.push(node);
    });

    const jsonContent = JSON.stringify(fontArr, null, 2);
    fs.writeFileSync('./dev-data/local-fonts.json', jsonContent);
};
createJSONFile();

// Accessing the created JSON file local-fonts.json;
let fontName = JSON.parse(fs.readFileSync('./dev-data/local-fonts.json'));

// Creating style2.css with @font-face property;
const createFontStylesheet = () => {
    let data = [];
    fontName.forEach((node) => {
        let fontFaceData = fontFace;
        let localData;
        let typeofFont = node.match(/(\.\w+)/g).join('');
        let nameOfFont = node.match(/.+?(?=\.)/g).join('');
        localData = fontFaceData.replace(/\[%FONT_NAME%\]/g, nameOfFont);
        localData = localData.replace(/\[%FONT_TYPE%\]/g, typeofFont);
        data.push(localData);
    });
    fs.writeFileSync('./public/style2.css', data.join('\n'));
};

// Creating HTML Cards;
const createCards = (jsonFile) => {
    let data = jsonFile;
    let finalOutput = [];

    data.forEach((node) => {
        let nameOfFont = node.match(/.+?(?=\.)/g).join('');
        finalOutput.push(newCards.replace('[%FONT_NAME%]', nameOfFont));
    });
    createFontStylesheet();
    return finalOutput.join('\n');
};

// Adding new cards to html;
html = html.replace('[%CARDS%]', createCards(fontName));

// GET/ Responding to server;
app.get('/', (req, res) => {
    res.send(html);
});

// Starting server here;
app.listen(8000, () => {
    console.log(`Server start at port 8000`);
});