const httpStatus = require('http-status');
const ServerService = require('../service/ServerService');
const TokenService = require('../service/TokenService');
const UserService = require('../service/UserService');
const logger = require('../config/logger');
// const { tokenTypes } = require('../config/tokens');

class ServerController {
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.ServerService = new ServerService();
    }

    servers = async (req, res) => {
        try {
            const servers = await this.ServerService.getAllServers();
            res.status(httpStatus.OK).send(servers);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    server = async (req, res) => {
        try {
            const server = await this.ServerService.getServerById(req.params.id);
            res.status(httpStatus.OK).send(server);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = ServerController;
