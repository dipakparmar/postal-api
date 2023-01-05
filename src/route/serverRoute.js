const express = require('express');
const ServerController = require('../controllers/ServerController');
const CredentialController = require('../controllers/CredentialController');

const router = express.Router();
const auth = require('../middlewares/auth');

const serverController = new ServerController();
const credentialController = new CredentialController();

// get all servers with auth
router.get('/', serverController.servers);
// get server by id with auth
router.get('/:id', auth(), serverController.server);

// get credential by server id
router.get('/:server_id/credentials', credentialController.CredentialByServerId);

module.exports = router;
