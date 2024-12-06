const express = require('express');
const fileController = require('../controler/fileController');
const fileService = require('../service/fileService');
const authenticateToken = require('../middlewere/authMiddleware');
const router = express.Router();


router.post('/upload',
    authenticateToken,
    fileService.uploadFile, 
    fileController.uploadFile);

router.get('/files/:filename',
    authenticateToken,
    fileController.downloadFile);

module.exports = router;
