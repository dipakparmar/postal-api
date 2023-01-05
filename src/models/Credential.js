const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Credential extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            //  User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
            Credential.belongsTo(models.server, { foreignKey: 'server_id', targetKey: 'id' });
        }
    }

    // CREATE TABLE `credentials` (
    //     `id` int(11) NOT NULL,
    //     `server_id` int(11) DEFAULT NULL,
    //     `key` varchar(255) DEFAULT NULL,
    //     `type` varchar(255) DEFAULT NULL,
    //     `name` varchar(255) DEFAULT NULL,
    //     `options` text DEFAULT NULL,
    //     `last_used_at` datetime(6) DEFAULT NULL,
    //     `created_at` datetime(6) DEFAULT NULL,
    //     `updated_at` datetime(6) DEFAULT NULL,
    //     `hold` tinyint(1) DEFAULT 0,
    //     `uuid` varchar(255) DEFAULT NULL
    //   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    Credential.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            server_id: DataTypes.INTEGER,
            key: DataTypes.STRING,
            type: DataTypes.STRING,
            name: DataTypes.STRING,
            options: DataTypes.TEXT,
            last_used_at: DataTypes.DATE,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            hold: DataTypes.BOOLEAN,
            uuid: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'credential',
            tableName: 'credentials',
            timestamps: false,
            underscored: true,
        },
    );

    return Credential;
};
