import fs from 'fs';

const templateIndexJs = `
export { default as {{fileName}} } from './{{fileName}}.svelte';
`;

export function createIndexJsFile(folderPath) {
    fs.writeFile(`${folderPath}/index.js`, '', (err, data) => {
        if (err) {
            console.error('Error write the index.js:', err);
        } else {
            console.log(`Index.js file created!`);
        }
    })
}

// Create IndexJS

export function createIndexJsReadFiles(folderPath, files) {
    files.every((file, index) => {
        const fileNameWithoutSVG = file.replace('.svg', '');
        addNewEntryIndexJs(folderPath, fileNameWithoutSVG);
        return true;
    });   
}

function addNewEntryIndexJs(folderPath, fileName) {

    const regex = /{{fileName}}/gi;
    const contentToAppend = templateIndexJs.replace(regex, fileName);
    fs.appendFileSync(`${folderPath}/index.js`, contentToAppend, (err) => {
        if (err) {
          console.error('Error appending content:', err);
        } else {
          console.log('Content appended successfully!');
        }
    });
}
