import fs from 'fs';
import path from 'path';

export function deleteFolderRecursive(folderPath) {
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