const fs = require('fs');
const fileService = require('../service/fileService');

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const log = `File uploaded: ${req.file.filename}, User: ${req.user.id}, Date: ${new Date().toISOString()}\n`;
  fs.appendFileSync('logs/upload-logs.txt', log);

  res.status(200).json({ message: 'File uploaded successfully!', filePath: req.file.path });
};

const downloadFile = (req, res) => {
  const filePath = fileService.getFilePath(req.params.filename);
  if (!filePath) {
    return res.status(404).json({ message: 'File not found!' });
  }
  const log = `File downloaded: ${req.params.filename}, User: ${req.user.id}, Date: ${new Date().toISOString()}\n`;
  fs.appendFileSync('logs/download-logs.txt', log);

  res.download(filePath); 
};

module.exports = {
  uploadFile,
  downloadFile,
};
