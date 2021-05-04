const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stays', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'patient',
        key: 'id'
      }
    },
    room_num: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'room',
        key: 'room_num'
      }
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    invoice_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stays',
    timestamps: false,
    indexes: [
      {
        name: "patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
      {
        name: "room_num",
        using: "BTREE",
        fields: [
          { name: "room_num" },
        ]
      },
    ]
  });
};
