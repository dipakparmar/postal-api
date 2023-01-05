/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const CredentialDao = require('../dao/CredentialDao');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');

class CredentialService {
    constructor() {
        this.CredentialDao = new CredentialDao();
    }

    /**
     * Create a Credential
     * @param {Object} CredentialBody
     * @returns {Object}
     */
    createCredential = async (CredentialBody) => {
        try {
            let message = 'Successfully Registered the Credential!';
            if (await this.CredentialDao.isPermalinkExists(CredentialBody.permalink)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'slug already taken'); // FIXME: need to check different way to handle this
            }
            const uuid = uuidv4();
            const latest_id = await this.CredentialDao.getLatestId();
            CredentialBody.id = latest_id + 1;
            CredentialBody.organization_id = 1; // FIXME: need to check from the users allowed organization or if the user is admin then from the organization table
            CredentialBody.permalink = CredentialBody.permalink.toLowerCase();
            CredentialBody.uuid = uuid;

            let CredentialData = await this.CredentialDao.create(CredentialBody);

            if (!CredentialData) {
                message = 'Registration Failed! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            CredentialData = CredentialData.toJSON();

            return responseHandler.returnSuccess(httpStatus.CREATED, message, CredentialData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    getCredentialByUuid = async (uuid) => {
        return this.CredentialDao.findOneByWhere({ uuid });
    };

    getCredentialById = async (id) => {
        return this.CredentialDao.findOneByWhere({ id });
    };

    getCredentialByName = async (name) => {
        return this.CredentialDao.findOneByWhere({ name });
    };

    getAllCredentials = async () => {
        return this.CredentialDao.findAll();
    };

    getAllCredentialsByServerId = async (server_id) => {
        return this.CredentialDao.findByWhere({ server_id });
    };

    getAllCredentialsWithUsername = async () => {
        return this.CredentialDao.getAllCredentialsWithUsername();
    };
}

module.exports = CredentialService;
