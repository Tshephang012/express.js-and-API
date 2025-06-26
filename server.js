console.log('Starting app...');
const express = require('express');
const morgan = require('morgan');
const productRoutes = require('./routes/products');
const { errorHandler, NotFoundError } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('----------------------------------');
  console.log(` Server running on port ${PORT}`);
  console.log('----------------------------------');
});
