import path from 'path';
import fs from 'fs';

export const clearImage = (filePath: string) => {
  filePath = path.join(__dirname, '..', '..', '/images', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
