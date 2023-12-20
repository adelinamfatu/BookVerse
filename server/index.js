const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = express();
const port = 6100;

const userRoutes = require('./routes/user-routes');

server.use(bodyParser.json());
server.use(cors());
server.use('/api/users', userRoutes);

server.use(express.json());
server.listen(port, () => {
  console.log(`Server runs at http://localhost:${port}`);
});