var express = require('express');
var router = express.Router();   
   
const cares = require("../controllers/care.controller");
const drugs = require("../controllers/drug.controller");
const health_records = require("../controllers/health_record.controller");
const instructions = require("../controllers/instruction.controller");
const invoices = require("../controllers/invoice.controller");
const nurses = require("../controllers/nurse.controller");
const patients = require("../controllers/patient.controller");
const payments = require("../controllers/payment.controller");
const physicians = require("../controllers/physician.controller");
const rooms = require("../controllers/room.controller");
const stays = require("../controllers/stays.controller");

// Cares
// Create
router.post("/cares/create", cares.create);
// Retrieve all
router.get("/cares", cares.findAll);
// Retrieve one by id
router.get("/cares/:patient_id", cares.findOne);
// Update
router.put("/cares/:patient_id", cares.update);
// Delete
router.delete("/cares/:patient_id", cares.delete);

// Drugs
// Create
router.post("/drugs/create", drugs.create);
// Retrieve all
router.get("/drugs", drugs.findAll);
// Retrieve one by id
router.get("/drugs/:patient_id", drugs.findOne);
// Update
router.put("/drugs/:patient_id", drugs.update);
// Delete
router.delete("/drugs/:patient_id", drugs.delete);

// Health Records
// Create
router.post("/health-records/create", health_records.create);
// Retrieve all
router.get("/health-records", health_records.findAll);
// Retrieve one by id
router.get("/health-records/:patient_id", health_records.findOne);
// Update
router.put("/health-records/:patient_id", health_records.update);
// Delete
router.delete("/health-records/:patient_id", health_records.delete);

// Instructions
// Create
router.post("/instructions/create", instructions.create);
// Retrieve all
router.get("/instructions", instructions.findAll);
// Retrieve one by id
router.get("/instructions/id/:patient_id", instructions.findOneId);
// Retrieve one by code
router.get("/instructions/code/:code", instructions.findOneCode);
// Update
router.put("/instructions/:code", instructions.update);
// Delete
router.delete("/instructions/:code", instructions.delete);

// Invoices
// Create
router.post("/invoices/create", invoices.create);
// Retrieve all
router.get("/invoices", invoices.findAll);
// Retrieve all for a patient
router.get("/invoices/patient/:patient_id", invoices.findAllId);
// Retrieve one by id
router.get("/invoices/:invoice_num", invoices.findOne);
// Update
router.put("/invoices/:invoice_num", invoices.update);
// Delete
router.delete("/invoices/:invoice_num", invoices.delete);

// Nurses
// Create
router.post("/nurses/create", nurses.create);
// Retrieve all
router.get("/nurses", nurses.findAll);
// Retrieve one by id
router.get("/nurses/id/:id", nurses.findOneId);
// Retrieve one by id
router.get("/nurses/name/:name", nurses.findOneName);
// Update
router.put("/nurses/:id", nurses.update);
// Delete
router.delete("/nurses/:id", nurses.delete);

// Patients
// Create
router.post("/patients/create", patients.create);
// Retrieve all
router.get("/patients", patients.findAll);
// Retrieve one by id
router.get("/patients/id/:id", patients.findOneId);
// Retrieve one by id
router.get("/patients/name/:name", patients.findOneName);
// Update
router.put("/patients/:id", patients.update);
// Delete
router.delete("/patients/:id", patients.delete);

// Payments
// Create
router.post("/payments/create", payments.create);
// Retrieve all
router.get("/payments", payments.findAll);
// Retrive all from an invoice
router.get("/payments/invoice/:invoice_num", payments.findAllNum);
// Retrieve one by id
router.get("/payments/:payment_num", payments.findOne);
// Update
router.put("/payments/:payment_num", payments.update);
// Delete
router.delete("/payments/:payment_num", payments.delete);

// Physicians
// Create
router.post("/physicians/create", physicians.create);
// Retrieve all
router.get("/physicians", physicians.findAll);
// Retrieve one by id
router.get("/physicians/id/:id", physicians.findOneId);
// Retrieve one by id
router.get("/physicians/name/:name", physicians.findOneName);
// Update
router.put("/physicians/:id", physicians.update);
// Delete
router.delete("/physicians/:id", physicians.delete);

//Rooms
// Create
router.post("/rooms/create", rooms.create);
// Retrieve all
router.get("/rooms", rooms.findAll);
// Retrieve one by id
router.get("/rooms/:room_num", rooms.findOne);
// Update
router.put("/rooms/:room_num", rooms.update);
// Delete
router.delete("/rooms/:room_num", rooms.delete);

// Stays
// Create
router.post("/stays/create", stays.create);
// Retrieve all
router.get("/stays", stays.findAll);
// Retrieve one by id
router.get("/stays/:patient_id", stays.findOne);
// Update
router.put("/stays/:patient_id", stays.update);
// Delete
router.delete("/stays/:patient_id", stays.delete);

module.exports = router;