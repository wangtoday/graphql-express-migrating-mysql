/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tickets', {
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		subject: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		priority_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		status_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		assigned_to_user_id: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'tickets',
		timestamps: false
	});
};
