const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../uploads')); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({
  storage,
  limits: { fileSize: process.env.MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = process.env.ALLOWED_FILE_TYPES.split(',');
    if (!allowedFileTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only images and PDFs are allowed!'), false);
    }
    cb(null, true);
  },
});

const uploadFile = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

const getFilePath = (filename) => {
  const filePath = path.resolve(__dirname, `../uploads/${filename}`);
  return fs.existsSync(filePath) ? filePath : null;
};

module.exports = {
  uploadFile,
  getFilePath,
};
