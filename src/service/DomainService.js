/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const DomainDao = require('../dao/DomainDao');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');

class DomainService {
    constructor() {
        this.DomainDao = new DomainDao();
    }

    /**
     * Create a Domain
     * @param {Object} DomainBody
     * @returns {Object}
     */
    createDomain = async (DomainBody) => {
        try {
            let message = 'Successfully Registered the Domain!';
            if (await this.DomainDao.isPermalinkExists(DomainBody.permalink)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'slug already taken'); // FIXME: need to check different way to handle this 
            }
            const uuid = uuidv4();
            const latest_id = await this.DomainDao.getLatestId();
            DomainBody.id = latest_id + 1;
            DomainBody.organization_id = 1; // FIXME: need to check from the users allowed organization or if the user is admin then from the organization table
            DomainBody.permalink = DomainBody.permalink.toLowerCase();
            DomainBody.uuid = uuid;

            let DomainData = await this.DomainDao.create(DomainBody);

            if (!DomainData) {
                message = 'Registration Failed! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            DomainData = DomainData.toJSON();

            return responseHandler.returnSuccess(httpStatus.CREATED, message, DomainData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    getDomainByUuid = async (uuid) => {
        return this.DomainDao.findOneByWhere({ uuid });
    };

    getDomainById = async (id) => {
        return this.DomainDao.findOneByWhere({ id });
    };

    getDomainByName = async (name) => {
        return this.DomainDao.findOneByWhere({ name });
    };

    getAllDomains = async () => {
        return this.DomainDao.findAll();
    };
}

module.exports = DomainService;
