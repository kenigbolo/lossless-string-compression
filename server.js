const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const busboy = require('connect-busboy');
const { compression, decompression } = require('./algorithm');
const { processRequest } = require('./file-reader');

app.use(cors());
app.use(bodyParser.json());
app.use(busboy());

app.post('/compress', (req, res) => {
  if (req.body.data) {
    const { stringValue } = req.body.data;
    const data = stringValue.split(',');
    const compressed = compression(data);
    return res.status(200).json({ data: compressed })
  } else {
    return processRequest(req, res, compression);
  }
});

app.post('/decompress', (req, res) => {
  if (req.body.data) {
    const { stringValue } = req.body.data;
    const data = stringValue.split(',');
    const decompressed = decompression(data);
    return res.status(200).json({ data: decompressed });
  } else {
    processRequest(req, res, decompression);
  }
});

app.listen(9000, () => {
  console.log('Server running on port 9000');
});
