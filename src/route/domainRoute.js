const express = require('express');
const DomainController = require('../controllers/DomainController');

const router = express.Router();
// const auth = require('../middlewares/auth');

const domainController = new DomainController();

// router.get(/^\/Domains\/?$/, auth, DomainController.getDomains);
// get all Domains without auth
router.get('/', domainController.Domains);
// get Domain by id
router.get('/:id', domainController.Domain);

module.exports = router;
