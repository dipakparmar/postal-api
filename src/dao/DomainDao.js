const SuperDao = require('./SuperDao');
const models = require('../models');

const Domain = models.domain;

class DomainDao extends SuperDao {
    constructor() {
        super(Domain);
    }

    async findById(id) {
        return Domain.findOne({ where: { id } });
    }

    async isIdExists(id) {
        return Domain.count({ where: { id } }).then((count) => {
            if (count !== 0) {
                return true;
            }
            return false;
        });
    }

    async isPermalinkExists(permalink) {
        return Domain.count({ where: { permalink } }).then((count) => {
            if (count !== 0) {
                return true;
            }
            return false;
        });
    }

    // get the Domain latest id from all the records
    async getLatestId() {
        const Domains = await Domain.findOne({
            order: [['id', 'DESC']],
        });
        // if Domain is not null then return the id else return 0
        return Domains ? Domains.id : 0;
    }



    async createWithTransaction(Domain, transaction) {
        return Domain.create(Domain, { transaction });
    }
}

module.exports = DomainDao;
