const express = require('express');
const authRoute = require('./authRoute');
const serverRoute = require('./serverRoute');
const organizationRoute = require('./organizationRoute');
const domainRoute = require('./domainRoute');

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
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
