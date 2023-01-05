/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const SuperDao = require('./SuperDao');
const models = require('../models');

const Credential = models.credential;

class CredentialDao extends SuperDao {
    constructor() {
        super(Credential);
    }

    async findById(id) {
        return Credential.findOne({ where: { id } });
    }

    async isIdExists(id) {
        return Credential.count({ where: { id } }).then((count) => {
            if (count !== 0) {
                return true;
            }
            return false;
        });
    }

    // get credentials with username - username value is dynamic built using organization permalink and server permalink
    async getAllCredentialsWithUsername() {
        return Credential.findAll({
            attributes: [
                'id',
                'server_id',
                'key',
                'type',
                'name',
                'options',
                'last_used_at',
                'created_at',
                'updated_at',
                'hold',
                'uuid',
            ],
            include: [
                {
                    model: models.server,
                    attributes: ['id', 'name', 'permalink'],
                    include: [
                        {
                            model: models.organization,
                            attributes: ['id', 'name', 'permalink'],
                        },
                    ],
                },
            ],
            // create username dynamically using organization permalink and server permalink and add it to the result set as username attribute in the result set. e.g. username: 'org-permalink-server-permalink'
            raw: true,
            nest: true,
            order: [['id', 'DESC']],
        }).then((result) => {
            const credentials = [];
            result.forEach((credential) => {
                credential.username = `${credential.server.organization.permalink}/${credential.server.permalink}`;
                credentials.push(credential);
            });
            return credentials;
        });
    }

    // get the Credential latest id from all the records
    async getLatestId() {
        const Credentials = await Credential.findOne({
            order: [['id', 'DESC']],
        });
        // if Credential is not null then return the id else return 0
        return Credentials ? Credentials.id : 0;
    }

    async createWithTransaction(credential, transaction) {
        return Credential.create(credential, { transaction });
    }
}

module.exports = CredentialDao;
