
// Import the 'fs' module to access the file system
import fs from 'fs';

import { createIconsTsReadFiles } from './create-icons-ts.js';

// Read the list of files in the "./icons" directory and filter out non-.svelte files.
const files = fs.readdirSync('./icons').filter((file) => file.endsWith('.svg'));

const folderPath = './svelte';

createIconsTsReadFiles(folderPath, files);
