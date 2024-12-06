const express = require('express');
const dotenv = require('dotenv');
const fileRoutes = require('./router/route');
const app = express();


dotenv.config();

app.use(express.json()); 

// Routes
app.use('/api', fileRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: 'Multer error occurred: ' + err.message });
  }
  if (err) {
    return res.status(500).json({ message: 'Server error: ' + err.message });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
