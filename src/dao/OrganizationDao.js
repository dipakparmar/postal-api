const SuperDao = require('./SuperDao');
const models = require('../models');

const Organization = models.organization;

class OrganizationDao extends SuperDao {
    constructor() {
        super(Organization);
    }

    async findById(id) {
        return Organization.findOne({ where: { id } });
    }

    async isIdExists(id) {
        return Organization.count({ where: { id } }).then((count) => {
            if (count !== 0) {
                return true;
            }
            return false;
        });
    }

    async isPermalinkExists(permalink) {
        return Organization.count({ where: { permalink } }).then((count) => {
            if (count !== 0) {
                return true;
            }
            return false;
        });
    }

    // get the Organization latest id from all the records
    async getLatestId() {
        const Organizations = await Organization.findOne({
            order: [['id', 'DESC']],
        });
        // if Organization is not null then return the id else return 0
        return Organizations ? Organizations.id : 0;
    }



    async createWithTransaction(Organization, transaction) {
        return Organization.create(Organization, { transaction });
    }
}

module.exports = OrganizationDao;
