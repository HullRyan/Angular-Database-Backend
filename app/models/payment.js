const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment', {
    payment_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    invoice_num: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'invoice',
        key: 'invoice_num'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'patient',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'payment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "payment_num" },
        ]
      },
      {
        name: "invoice_num",
        using: "BTREE",
        fields: [
          { name: "invoice_num" },
        ]
      },
      {
        name: "patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
};
