const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Server extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        //     // define association here
        //     //  User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        // }
    }

    Server.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            organization_id: DataTypes.INTEGER,
            uuid: DataTypes.STRING,
            name: DataTypes.STRING,
            mode: DataTypes.STRING,
            ip_pool_id: DataTypes.INTEGER,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            permalink: DataTypes.STRING,
            send_limit: DataTypes.INTEGER,
            deleted_at: DataTypes.DATE,
            message_retention_days: DataTypes.INTEGER,
            raw_message_retention_days: DataTypes.INTEGER,
            raw_message_retention_size: DataTypes.INTEGER,
            allow_sender: DataTypes.BOOLEAN,
            token: DataTypes.STRING,
            send_limit_approaching_at: DataTypes.DATE,
            send_limit_approaching_notified_at: DataTypes.DATE,
            send_limit_exceeded_at: DataTypes.DATE,
            send_limit_exceeded_notified_at: DataTypes.DATE,
            spam_threshold: DataTypes.DECIMAL,
            spam_failure_threshold: DataTypes.DECIMAL,
            postmaster_address: DataTypes.STRING,
            suspended_at: DataTypes.DATE,
            outbound_spam_threshold: DataTypes.DECIMAL,
            domains_not_to_click_track: DataTypes.TEXT,
            suspension_reason: DataTypes.STRING,
            log_smtp_data: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'server',
            underscored: true,
            tableName: 'servers',
            timestamps: false,
        },
    );
    return Server;
};
