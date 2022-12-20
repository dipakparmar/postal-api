const SuperDao = require('./SuperDao');
const models = require('../models');

const Server = models.server;

class ServerDao extends SuperDao {
    constructor() {
        super(Server);
    }

    async findById(id) {
        return Server.findOne({ where: { id } });
    }

    async isIdExists(id) {
        return Server.count({ where: { id } }).then((count) => {
            if (count !== 0) {
                return true;
            }
            return false;
        });
    }

    async isPermalinkExists(permalink) {
        return Server.count({ where: { permalink } }).then((count) => {
            if (count !== 0) {
                return true;
            }
            return false;
        });
    }

    // get the server latest id from all the records
    async getLatestId() {
        const servers = await Server.findOne({
            order: [['id', 'DESC']],
        });
        // if server is not null then return the id else return 0
        return servers ? servers.id : 0;
    }



    async createWithTransaction(server, transaction) {
        return Server.create(server, { transaction });
    }
}

module.exports = ServerDao;
