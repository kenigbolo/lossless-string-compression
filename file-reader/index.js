const readline = require('readline');
const fs = require('fs');

const readFileOut = (file, callBack) => {
  const wordsArray = [];
  // create instance of readline
  // each instance is associated with single input stream
  let rl = readline.createInterface({
    input: fs.createReadStream(file),
  });

  // event is emitted after each line
  rl.on('line', function(line) {
    wordsArray.push(line);
  });

  // end
  rl.on('close', function() {
    // console.log(wordsArray);
    callBack(wordsArray);
  });
};

/**
 * Function to delete files in temp storage
 * @param {Array} filePaths The files to be deleted
 */
function deleteFiles(filePaths) {
  filePaths.forEach(filePath => {
    fs.unlink(filePath, err => {
      if (err) throw err;
      console.log(`${filePath} successfully deleted`);
    });
  });
}

const processRequest = (req, res, algorithm) => {
  let fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', (_, file, filename) => {
    const filePath = `${process.cwd()}/uploaded/${filename}`;
    fstream = fs.createWriteStream(filePath);
    file.pipe(fstream);
    fstream.on('finish', () => {
      readFileOut(filePath, data => {
        const processedData = algorithm(data);
        res.send(processedData);
        deleteFiles([filePath]);
      });
    });
  });
};

module.exports = {processRequest};
