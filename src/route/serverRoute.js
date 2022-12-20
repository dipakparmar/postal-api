const express = require('express');
const ServerController = require('../controllers/ServerController');

const router = express.Router();
const auth = require('../middlewares/auth');

const serverController = new ServerController();

// get all servers with auth
router.get('/', auth(), serverController.servers);
// get server by id with auth
router.get('/:id', auth(), serverController.server);

module.exports = router;
