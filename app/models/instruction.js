const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('instruction', {
    code: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    instructions_fee: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    execute_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phys_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'physician',
        key: 'id'
      }
    },
    nurse_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nurse',
        key: 'id'
      }
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'patient',
        key: 'id'
      }
    },
    invoice_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'instruction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "phys_id",
        using: "BTREE",
        fields: [
          { name: "phys_id" },
        ]
      },
      {
        name: "nurse_id",
        using: "BTREE",
        fields: [
          { name: "nurse_id" },
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
