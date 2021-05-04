const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room', {
    room_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fee: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'room',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "room_num" },
        ]
      },
    ]
  });
};
