/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const httpStatus = require('http-status');
// const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
// const UserDao = require('../dao/UserDao');
const OrganizationDao = require('../dao/OrganizationDao');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
// const { userConstant } = require('../config/constant');

class OrganizationService {
    constructor() {
        this.OrganizationDao = new OrganizationDao();
    }

    /**
     * Create a Organization
     * @param {Object} OrganizationBody
     * @returns {Object}
     */
    createOrganization = async (OrganizationBody) => {
        try {
            let message = 'Successfully Registered the Organization!';
            if (await this.OrganizationDao.isPermalinkExists(OrganizationBody.permalink)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'slug already taken'); // FIXME: need to check different way to handle this 
            }
            const uuid = uuidv4();
            const latest_id = await this.OrganizationDao.getLatestId();
            OrganizationBody.id = latest_id + 1;
            OrganizationBody.organization_id = 1; // FIXME: need to check from the users allowed organization or if the user is admin then from the organization table
            OrganizationBody.permalink = OrganizationBody.permalink.toLowerCase();
            OrganizationBody.uuid = uuid;

            let OrganizationData = await this.OrganizationDao.create(OrganizationBody);

            if (!OrganizationData) {
                message = 'Registration Failed! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            OrganizationData = OrganizationData.toJSON();

            return responseHandler.returnSuccess(httpStatus.CREATED, message, OrganizationData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    /**
     * Get Organization
     * @param {String} permalink
     * @returns {Object}
     */

    isPermalinkExists = async (permalink) => {
        const message = 'Permalink found!';
        if (!(await this.OrganizationDao.isPermalinkExists(permalink))) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Permalink not Found!!');
        }
        return responseHandler.returnSuccess(httpStatus.OK, message);
    };

    getOrganizationByUuid = async (uuid) => {
        return this.OrganizationDao.findOneByWhere({ uuid });
    };

    getOrganizationById = async (id) => {
        return this.OrganizationDao.findOneByWhere({ id });
    };

    getAllOrganizations = async () => {
        return this.OrganizationDao.findAll();
    };
}

module.exports = OrganizationService;
