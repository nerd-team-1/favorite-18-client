import {getDateWithSeperator} from './date';

function generateFilename() {
  const today = getDateWithSeperator(new Date());
  let fileName = `${today}`;

  return fileName;
}

export {generateFilename};
