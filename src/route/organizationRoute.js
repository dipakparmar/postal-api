const express = require('express');
const OrganizationController = require('../controllers/OrganizationController');

const router = express.Router();
// const auth = require('../middlewares/auth');

const organizationController = new OrganizationController();

// get all Organizations with auth
router.get(/^\/\/?$/, organizationController.Organizations);
// get Organization by id with auth
router.get('/:id', organizationController.Organization);

module.exports = router;
