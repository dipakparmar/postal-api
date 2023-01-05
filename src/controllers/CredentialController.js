const httpStatus = require('http-status');
const CredentialService = require('../service/CredentialService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const logger = require('../config/logger');

class CredentialController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.CredentialService = new CredentialService();
    }

    Credentials = async (req, res) => {
        try {
            const Credentials = await this.CredentialService.getAllCredentials();
            res.status(httpStatus.OK).send(Credentials);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    Credential = async (req, res) => {
        let Credential = null;
        try {
            // FIXME: this method is not perfect as there can be multiple Credentials with same name but different id and uuid so we need to check the id and uuid as well
            // check req.params.id is a valid id or Credential name (string)
            // if id, then get Credential by id
            if (req.params.id.match(/^[0-9]+$/)) {
                Credential = await this.CredentialService.getCredentialById(req.params.id);
            } else {
                // if Credential name, then get Credential by Credential name
                Credential = await this.CredentialService.getCredentialByName(req.params.id);
            }
            // if Credential is not null then return the Credential else return 404
            if (Credential) {
                res.status(httpStatus.OK).send(Credential);
            } else {
                res.status(httpStatus.OK).send({ code: 204, message: 'Credential not found' });
            }
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    CredentialByServerId = async (req, res) => {
        let Credential = null;
        try {
            Credential = await this.CredentialService.getAllCredentialsByServerId(
                req.params.server_id,
            );

            // if Credential is not null then return the Credential else return 404
            if (Credential) {
                res.status(httpStatus.OK).send(Credential);
            } else {
                res.status(httpStatus.OK).send({ code: 204, message: 'Credential not found' });
            }
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    CredentialsWithUsernames = async (req, res) => {
        try {
            const Credentials = await this.CredentialService.getAllCredentialsWithUsername();
            res.status(httpStatus.OK).send(Credentials);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = CredentialController;
