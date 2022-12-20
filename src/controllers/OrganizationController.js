const httpStatus = require('http-status');
const OrganizationService = require('../service/OrganizationService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const logger = require('../config/logger');

class OrganizationController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.OrganizationService = new OrganizationService();
    }

    Organizations = async (req, res) => {
        try {
            const Organizations = await this.OrganizationService.getAllOrganizations();
            res.status(httpStatus.OK).send(Organizations);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    Organization = async (req, res) => {
        try {
            const Organization = await this.OrganizationService.getOrganizationById(req.params.id);
            // if Organization is not null then return the Organization else return 404
            if (Organization) {
                res.status(httpStatus.OK).send(Organization);
            } else {
                res.status(httpStatus.OK).send({ code: 204, message: 'Organization not found' });
            }
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = OrganizationController;
