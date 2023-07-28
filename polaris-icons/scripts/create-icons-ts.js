import fs from 'fs';

import { createAriaLabel } from "./create-svelte-files.js";
import { createSvelteFolder } from './utils.js';

const templateIconsTsImport = `
    import {
        {{imports}}
    } from '$lib';
`;

const templateIconsTsMajorIcons = `
    export const MAJOR_ICONS: App.Icon[] = [{{majorIconsList}}]
`;

const templateIconsTsMinorIcons = `
    export const MINOR_ICONS: App.Icon[] = [{{minorIconsList}}]
`;

const templateIconsTsIcon = `
{
    icon: {{fileName}},
    name: '{{iconName}}',
    iconNameImport: '{{fileName}}',
},
`;

// Iterate over each ".svg" file in the "./icons" directory.
// For each file, add an entry to the "exports" object with the svelte and types paths updated.

const fileNames = [];
const fileNamesMajorTemplatesIcon = [];
const fileNamesMinorTemplatesIcon = [];

export function createIconsTsReadFiles(folderPath, files) {

    createSvelteFolder(folderPath);

    files.every((file, index) => {
        const fileNameWithoutSVG = file.replace('.svg', '');
        fileNames.push(fileNameWithoutSVG);

        const regexFileName = /{{fileName}}/gi;
        const templateTemp = templateIconsTsIcon.replace(regexFileName, fileNameWithoutSVG).replace('{{iconName}}', createIconName(fileNameWithoutSVG));
        if(fileNameWithoutSVG.includes('Major')) {
            fileNamesMajorTemplatesIcon.push(templateTemp);
        } else {
            fileNamesMinorTemplatesIcon.push(templateTemp);
        }
        return true;
    });

    const templateTempImports = templateIconsTsImport.replace('{{imports}}', fileNames.join(','));
    const templateTempMajorIcons = templateIconsTsMajorIcons.replace('{{majorIconsList}}', fileNamesMajorTemplatesIcon.join(''));
    const templateTempMinorIcons = templateIconsTsMinorIcons.replace('{{minorIconsList}}', fileNamesMinorTemplatesIcon.join(''));


    const templateIconsTsImportFinal = `
        ${templateTempImports}

        ${templateTempMajorIcons}

        ${templateTempMinorIcons}
    `;

    fs.writeFile(`${folderPath}/icons.ts`, templateIconsTsImportFinal, (err, data) => {
        if (err) {
            console.error('Error write the icons.ts file:', err);
        } else {
            console.log(`icons.ts file created!`);
        }
    });
}



function createIconName(fileName){
    return capitalizeFirstCharacter(createAriaLabel(fileName));
}

function capitalizeFirstCharacter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
