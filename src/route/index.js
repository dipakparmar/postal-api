const express = require('express');
const authRoute = require('./authRoute');
const serverRoute = require('./serverRoute');
const organizationRoute = require('./organizationRoute');
const domainRoute = require('./domainRoute');
const credentialRoute = require('./credentialRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/servers',
        route: serverRoute,
    },
    {
        path: '/organizations',
        route: organizationRoute,
    },
    {
        path: '/domains',
        route: domainRoute,
    },
    {
        path: '/credentials',
        route: credentialRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
