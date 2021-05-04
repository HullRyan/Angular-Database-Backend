const db = require("../models");
const Invoice = db.models.invoice;
const Op = db.Sequelize.Op;

//Create a Invoice
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be blank"
        });
        return;
    }

    const invoice = {
        invoice_num: req.body.invoice_num,
        patient_id: req.body.patient_id,
        stay_fee: req.body.stay_fee,
        instructions_fee: req.body.instructions_fee
    }

    Invoice.create(invoice).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Invoice."
          });
    });
};

// Retrieve all Invoice from the database.
exports.findAll = (req, res) => {
  const invoice_num = req.query.invoice_num;
  var condition = invoice_num ? { invoice_num: { [Op.like]: `%${invoice_num}%` } } : null;

  Invoice.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Invoices."
      });
    });
};

// Retrieve all Invoice from the database with a patient id.
exports.findAllId = (req, res) => {
    const patient_id = req.query.patient_id;
    var condition = patient_id;
  
    Invoice.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Invoices."
        });
      });
  };

// Find a single Invoice with an id
exports.findOne = (req, res) => {
  const invoice_num = req.params.invoice_num;

  Invoice.findByPk(invoice_num)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Invoice with invoice num=" + invoice_num
      });
    });
};

// Update a Invoice by the id in the request
exports.update = (req, res) => {
  const invoice_num = req.params.invoice_num;

  Invoice.update(req.body, {
    where: { invoice_num: invoice_num }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Invoice was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Invoice with invoice_num=${invoice_num}. Maybe Invoice was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Invoice with patient id=" + invoice_num
      });
    });
};

// Delete a Invoice with the specified id in the request
exports.delete = (req, res) => {
  const invoice_num = req.params.invoice_num;

  Invoice.destroy({
    where: { invoice_num: invoice_num }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Invoice was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Invoice with id=${invoice_num}. Maybe Invoice was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Invoice with patient id=" + invoice_num
      });
    });
};