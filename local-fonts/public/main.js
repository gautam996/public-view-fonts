console.log('Client side JS Working');

function FontFamily(fontName) {}

// updating font family of all content with respect to their font;
function updateFontFamily() {
    console.log('Function executed!');
    let contentData = Array.from(document.querySelectorAll('.font__Style'));

    let fontNames = [];
    Array.from(document.querySelectorAll('.font__name')).forEach((node) => {
        fontNames.push(node.innerHTML);
    });
    fontNames.forEach((node, index) => {
        if (node.indexOf('&amp;') > -1) {
            fontNames[index] = node.replace('&amp;', '&');
        }
    });

    // console.log(contentData);
    // console.log(fontNames);

    contentData.forEach((node, index) => {
        node.style.fontFamily = fontNames[index];
        // console.log(node);
        // console.log(fontNames[index]);
    });
}

// waiting for the page to load 3seconds;
setTimeout(function() {
    updateFontFamily();
}, 1000);