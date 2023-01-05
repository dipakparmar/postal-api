const express = require('express');
const CredentialController = require('../controllers/CredentialController');

const router = express.Router();
const auth = require('../middlewares/auth');

const credentialController = new CredentialController();

// router.get(/^\/Credentials\/?$/, auth, CredentialController.getCredentials);
// get all Credentials with auth
router.get('/', auth(), credentialController.Credentials);
// get all Credentials with auth and usernames
router.get('/withusernames', auth(), credentialController.CredentialsWithUsernames);
// get Credential by id with auth
router.get('/:id', auth(), credentialController.Credential);

module.exports = router;
