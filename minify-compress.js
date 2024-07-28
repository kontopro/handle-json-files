const fs = require('fs');
const path = require('path');
const pako = require('pako');

const inputFilePath = path.join(__dirname, 'parts.json'); // Ensure parts.json is in the same directory
const outputFilePathMinified = path.join(__dirname, 'parts.min.json');
const outputFilePathCompressed = path.join(__dirname, 'parts.min.json.gz');

fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Minify the JSON data
    const jsonData = JSON.parse(data);
    const minifiedJson = JSON.stringify(jsonData);

    // Write the minified JSON to file
    fs.writeFile(outputFilePathMinified, minifiedJson, 'utf8', (err) => {
      if (err) {
        console.error('Error writing the minified file:', err);
        return;
      }
      console.log('JSON file has been minified successfully.');

      // Compress the minified JSON
      const compressedData = pako.gzip(minifiedJson);
      fs.writeFile(outputFilePathCompressed, compressedData, (err) => {
        if (err) {
          console.error('Error writing the compressed file:', err);
          return;
        }
        console.log('JSON file has been compressed successfully.');
      });
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
