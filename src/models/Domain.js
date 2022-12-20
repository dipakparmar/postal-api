const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Domain extends Model {
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

    // CREATE TABLE `domains` (
    //     `id` int(11) NOT NULL,
    //     `server_id` int(11) DEFAULT NULL,
    //     `uuid` varchar(255) DEFAULT NULL,
    //     `name` varchar(255) DEFAULT NULL,
    //     `verification_token` varchar(255) DEFAULT NULL,
    //     `verification_method` varchar(255) DEFAULT NULL,
    //     `verified_at` datetime DEFAULT NULL,
    //     `dkim_private_key` text DEFAULT NULL,
    //     `created_at` datetime(6) DEFAULT NULL,
    //     `updated_at` datetime(6) DEFAULT NULL,
    //     `dns_checked_at` datetime(6) DEFAULT NULL,
    //     `spf_status` varchar(255) DEFAULT NULL,
    //     `spf_error` varchar(255) DEFAULT NULL,
    //     `dkim_status` varchar(255) DEFAULT NULL,
    //     `dkim_error` varchar(255) DEFAULT NULL,
    //     `mx_status` varchar(255) DEFAULT NULL,
    //     `mx_error` varchar(255) DEFAULT NULL,
    //     `return_path_status` varchar(255) DEFAULT NULL,
    //     `return_path_error` varchar(255) DEFAULT NULL,
    //     `outgoing` tinyint(1) DEFAULT 1,
    //     `incoming` tinyint(1) DEFAULT 1,
    //     `owner_type` varchar(255) DEFAULT NULL,
    //     `owner_id` int(11) DEFAULT NULL,
    //     `dkim_identifier_string` varchar(255) DEFAULT NULL,
    //     `use_for_any` tinyint(1) DEFAULT NULL

    Domain.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            server_id: DataTypes.INTEGER,
            uuid: DataTypes.STRING,
            name: DataTypes.STRING,
            verification_token: DataTypes.STRING,
            verification_method: DataTypes.STRING,
            verified_at: DataTypes.DATE,
            dkim_private_key: DataTypes.TEXT,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
            dns_checked_at: DataTypes.DATE,
            spf_status: DataTypes.STRING,
            spf_error: DataTypes.STRING,
            dkim_status: DataTypes.STRING,
            dkim_error: DataTypes.STRING,
            mx_status: DataTypes.STRING,
            mx_error: DataTypes.STRING,
            return_path_status: DataTypes.STRING,
            return_path_error: DataTypes.STRING,
            outgoing: DataTypes.BOOLEAN,
            incoming: DataTypes.BOOLEAN,
            owner_type: DataTypes.STRING,
            owner_id: DataTypes.INTEGER,
            dkim_identifier_string: DataTypes.STRING,
            use_for_any: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'domain',
            tableName: 'domains',
            timestamps: false,
            underscored: true,
        },
    );

    return Domain;
};
