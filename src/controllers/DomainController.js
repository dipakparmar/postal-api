const httpStatus = require('http-status');
const DomainService = require('../service/DomainService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const logger = require('../config/logger');

class DomainController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.DomainService = new DomainService();
    }

    Domains = async (req, res) => {
        try {
            const Domains = await this.DomainService.getAllDomains();
            res.status(httpStatus.OK).send(Domains);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    Domain = async (req, res) => {
        let Domain = null;
        try {
            // FIXME: this method is not perfect as there can be multiple domains with same name but different id and uuid so we need to check the id and uuid as well
            // check req.params.id is a valid id or domain name (string)
            // if id, then get domain by id
            if (req.params.id.match(/^[0-9]+$/)) {
                Domain = await this.DomainService.getDomainById(req.params.id);
            } else {
                // if domain name, then get domain by domain name
                Domain = await this.DomainService.getDomainByName(req.params.id);
            }
            // if Domain is not null then return the Domain else return 404
            if (Domain) {
                res.status(httpStatus.OK).send(Domain);
            } else {
                res.status(httpStatus.OK).send({ code: 204, message: 'Domain not found' });
            }
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = DomainController;
