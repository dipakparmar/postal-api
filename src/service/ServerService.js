/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const ServerDao = require('../dao/ServerDao');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');

class ServerService {
    constructor() {
        this.serverDao = new ServerDao();
    }

    /**
     * Create a server
     * @param {Object} serverBody
     * @returns {Object}
     */
    createServer = async (serverBody) => {
        try {
            let message = 'Successfully Registered the server!';
            if (await this.serverDao.isPermalinkExists(serverBody.permalink)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'slug already taken'); // FIXME: need to check different way to handle this 
            }
            const uuid = uuidv4();
            const latest_id = await this.serverDao.getLatestId();
            serverBody.id = latest_id + 1;
            serverBody.organization_id = 1; // FIXME: need to check from the users allowed organization or if the user is admin then from the organization table
            serverBody.permalink = serverBody.permalink.toLowerCase();
            serverBody.uuid = uuid;

            let serverData = await this.serverDao.create(serverBody);

            if (!serverData) {
                message = 'Registration Failed! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            serverData = serverData.toJSON();

            return responseHandler.returnSuccess(httpStatus.CREATED, message, serverData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    /**
     * Check if the server is already registered
     * @param {String} permalink
     * @returns {Object}
     */
    isPermalinkExists = async (permalink) => {
        const message = 'Permalink found!';
        if (!(await this.serverDao.isPermalinkExists(permalink))) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Permalink not Found!!');
        }
        return responseHandler.returnSuccess(httpStatus.OK, message);
    };

    getServerByUuid = async (uuid) => {
        return this.serverDao.findOneByWhere({ uuid });
    };

    getServerById = async (id) => {
        return this.serverDao.findOneByWhere({ id });
    };

    getAllServers = async () => {
        return this.serverDao.findAll();
    };
}

module.exports = ServerService;
