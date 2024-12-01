
// Import the 'fs' module to access the file system
import fs from 'fs';

import { createIconsTsReadFiles } from './create-icons-ts.js';
import { createSvelteFolder, deleteFolderRecursive } from './utils.js';
import { createIndexJsFile } from './create-index-js.js';
import { createSvelte5FilesReadFiles } from './create-svelte-5-files.js';

// Read the list of files in the "./icons" directory and filter out non-.svelte files.
const files = fs.readdirSync('./icons').filter((file) => file.endsWith('.svg'));

const folderPath = './svelte';

// createIconsTsReadFiles(folderPath, files);

// --- Create the svelte folder and icons svelte
deleteFolderRecursive(folderPath);
createSvelteFolder(folderPath);
createSvelte5FilesReadFiles(folderPath, files);
