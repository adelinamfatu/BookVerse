const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const server = express();
const port = 6100;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userRoutes = require('./routes/user-routes');
const bookRoutes = require('./routes/book-routes');
const bookshelfRoutes = require('./routes/bookshelf-routes');

server.use(bodyParser.json());
server.use(cors());
server.use(upload.single('file'));

server.use('/api/users', userRoutes);
server.use('/api/books', bookRoutes);
server.use('/api/bookshelves', bookshelfRoutes);

server.use(express.json());
server.listen(port, () => {
  console.log(`Server runs at http://localhost:${port}`);
});