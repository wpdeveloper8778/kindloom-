const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');

router.post('/', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      const message = err.code === 'LIMIT_FILE_SIZE'
        ? 'File too large. Max 5MB.'
        : err.message;
      return res.status(400).json({ message });
    }
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({ url: req.file.path, public_id: req.file.filename });
  });
});

module.exports = router;
