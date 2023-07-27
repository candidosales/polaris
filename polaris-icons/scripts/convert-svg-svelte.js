
// Import the 'fs' module to access the file system
import fs from 'fs';
import path from 'path';

// Read the list of files in the "./icons" directory and filter out non-.svelte files.
const files = fs.readdirSync('./icons').filter((file) => file.endsWith('.svg'));

const folderPath = './svelte';

// Create the svelte folder"
deleteFolderRecursive(folderPath);
createSvelteFolder();
createIndexJsFile();

const templateSvelte = `
<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
    export let role: string = 'img';
    const sizes = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8'
    };
    export let ariaLabel = '{{ariaLabel}}';
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...$$restProps}
    class={twMerge('shrink-0', sizes[size], $$props.class)}
    {role}
    aria-label={ariaLabel}
    viewBox="0 0 20 20"
>`;

const templateIndexJs = `
export { default as {{fileName}} } from './{{fileName}}.svelte';
`;


// Iterate over each ".svg" file in the "./icons" directory.
// For each file, add an entry to the "exports" object with the svelte and types paths updated.

// const max = 2;
files.every((file, index) => {
    // if (index > max) {
    //     return false;
    // }

    // createSvelteFiles(file);

    const fileName = file.replace('.svg', '');
    addNewEntryIndexJs(fileName);

    return true;
});

function createSvelteFolder() {
    fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
        console.error('Error creating folder:', err);
    } else {
        console.log('Folder created successfully!');
    }
    });
}

function createIndexJsFile() {
    fs.writeFile(`${folderPath}/index.js`, '', (err, data) => {
        if (err) {
            console.error('Error write the index.js:', err);
        } else {
            console.log(`Index.js file created!`);
        }
    })
}

function createSvelteFiles(file) {
    fs.readFile(`./icons/${file}`, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the SVG file:', err);
        } else {
            console.log('SVG content:\n', data);

            const finalData = replaceTemplate(fileName, data)
            console.log('SVG final data:\n', finalData);

            createSvelteFile(fileName, finalData);
        }
    });
}

function createSvelteFile(fileName, content) {
    fs.writeFile(`${folderPath}/${fileName}.svelte`, content, (err, data) => {
        if (err) {
            console.error('Error write the Svelte file:', err);
        } else {
            console.log(`Svelte ${fileName} file created!`);
        }
    })
}

function replaceTemplate(fileName, data) {
    const ariaLabel = createAriaLabel(fileName);
    console.log('ariaLabel', ariaLabel);

    const templateFinal = replaceAriaLabelTemplate(ariaLabel, templateSvelte);

    console.log('templateFinal', templateFinal)

    console.log('-----------------------\n')

    return data.replace('<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">',templateFinal);
}

function createAriaLabel(fileName){
    const regex = /Major|Minor/g;
    const nameCleaned = fileName.replace(regex, '');

    const nameParts = nameCleaned.split(/(?=[A-Z])/);
    return nameParts.join(' ').toLowerCase();
}

function replaceAriaLabelTemplate(ariaLabel, template) {
    return template.replace('{{ariaLabel}}', ariaLabel);
}

function addNewEntryIndexJs(fileName) {

    const regex = /{{fileName}}/gi;
    const contentToAppend = templateIndexJs.replace(regex, fileName);

    fs.appendFile(`${folderPath}/index.js`, contentToAppend, (err) => {
        if (err) {
          console.error('Error appending content:', err);
        } else {
          console.log('Content appended successfully!');
        }
    });
}

function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file) => {
        const currentPath = path.join(folderPath, file);
        if (fs.lstatSync(currentPath).isDirectory()) {
          // Recursively delete subdirectories
          deleteFolderRecursive(currentPath);
        } else {
          // Delete file
          fs.unlinkSync(currentPath);
        }
      });
  
      // Delete the empty directory
      fs.rmdirSync(folderPath);
      console.log('Folder deleted successfully:', folderPath);
    } else {
      console.log('Folder does not exist:', folderPath);
    }
  }