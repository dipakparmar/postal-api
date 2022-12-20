const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Organization extends Model {
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

    // CREATE TABLE `organizations` (
    //     `id` int(11) NOT NULL,
    //     `uuid` varchar(255) DEFAULT NULL,
    //     `name` varchar(255) DEFAULT NULL,
    //     `permalink` varchar(255) DEFAULT NULL,
    //     `time_zone` varchar(255) DEFAULT NULL,
    //     `created_at` datetime(6) DEFAULT NULL,
    //     `updated_at` datetime(6) DEFAULT NULL,
    //     `ip_pool_id` int(11) DEFAULT NULL,
    //     `owner_id` int(11) DEFAULT NULL,
    //     `deleted_at` datetime(6) DEFAULT NULL,
    //     `suspended_at` datetime(6) DEFAULT NULL,
    //     `suspension_reason` varchar(255) DEFAULT NULL

    Organization.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid: DataTypes.STRING,
            name: DataTypes.STRING,
            permalink: DataTypes.STRING,
            time_zone: DataTypes.STRING,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            ip_pool_id: DataTypes.INTEGER,
            owner_id: DataTypes.INTEGER,
            deleted_at: DataTypes.DATE,
            suspended_at: DataTypes.DATE,
            suspension_reason: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'organization',
            tableName: 'organizations',
            timestamps: false,
            underscored: true,
        },
    );

    return Organization;
};
