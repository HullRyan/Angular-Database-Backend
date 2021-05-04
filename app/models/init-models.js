var DataTypes = require("sequelize").DataTypes;
var _cares = require("./cares");
var _drug = require("./drug");
var _health_record = require("./health_record");
var _instruction = require("./instruction");
var _invoice = require("./invoice");
var _nurse = require("./nurse");
var _patient = require("./patient");
var _payment = require("./payment");
var _physician = require("./physician");
var _room = require("./room");
var _stays = require("./stays");

function initModels(sequelize) {
  var cares = _cares(sequelize, DataTypes);
  var drug = _drug(sequelize, DataTypes);
  var health_record = _health_record(sequelize, DataTypes);
  var instruction = _instruction(sequelize, DataTypes);
  var invoice = _invoice(sequelize, DataTypes);
  var nurse = _nurse(sequelize, DataTypes);
  var patient = _patient(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var physician = _physician(sequelize, DataTypes);
  var room = _room(sequelize, DataTypes);
  var stays = _stays(sequelize, DataTypes);

  payment.belongsTo(invoice, { as: "invoice_num_invoice", foreignKey: "invoice_num"});
  invoice.hasMany(payment, { as: "payments", foreignKey: "invoice_num"});
  drug.belongsTo(nurse, { as: "nurse", foreignKey: "nurse_id"});
  nurse.hasMany(drug, { as: "drugs", foreignKey: "nurse_id"});
  instruction.belongsTo(nurse, { as: "nurse", foreignKey: "nurse_id"});
  nurse.hasMany(instruction, { as: "instructions", foreignKey: "nurse_id"});
  cares.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(cares, { as: "cares", foreignKey: "patient_id"});
  drug.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(drug, { as: "drugs", foreignKey: "patient_id"});
  health_record.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasOne(health_record, { as: "health_record", foreignKey: "patient_id"});
  instruction.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(instruction, { as: "instructions", foreignKey: "patient_id"});
  invoice.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(invoice, { as: "invoices", foreignKey: "patient_id"});
  payment.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(payment, { as: "payments", foreignKey: "patient_id"});
  stays.belongsTo(patient, { as: "patient", foreignKey: "patient_id"});
  patient.hasMany(stays, { as: "stays", foreignKey: "patient_id"});
  instruction.belongsTo(physician, { as: "phy", foreignKey: "phys_id"});
  physician.hasMany(instruction, { as: "instructions", foreignKey: "phys_id"});
  stays.belongsTo(room, { as: "room_num_room", foreignKey: "room_num"});
  room.hasMany(stays, { as: "stays", foreignKey: "room_num"});

  cares.removeAttribute('id');

  return {
    cares,
    drug,
    health_record,
    instruction,
    invoice,
    nurse,
    patient,
    payment,
    physician,
    room,
    stays,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
