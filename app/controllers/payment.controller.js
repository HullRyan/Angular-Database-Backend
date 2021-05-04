const db = require("../models");
const Payment = db.models.payment;
const Op = db.Sequelize.Op;

//Create a Payment
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be blank"
        });
        return;
    }

    const payment = {
        payment_num: req.body.payment_num,
        amount: req.body.amount,
        invoice_num: req.body.invoice_num,
        date: req.body.date
    }

    Payment.create(payment).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Payment."
          });
    });
};

// Retrieve all Payment from the database.
exports.findAll = (req, res) => {
  const payment_num = req.query.payment_num;
  var condition = payment_num ? { payment_num: { [Op.like]: `%${payment_num}%` } } : null;

  Payment.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Payments."
      });
    });
};

// Retrieve all payments with an invoice num.
exports.findAllNum = (req, res) => {
    const invoice_num = req.query.invoice_num;
    var condition = invoice_num;
  
    Payment.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Payments."
        });
      });
  };

// Find a single Payment with an payment_num
exports.findOne = (req, res) => {
  const payment_num = req.params.payment_num;

  Payment.findByPk(payment_num)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Payment with payment num=" + payment_num
      });
    });
};

// Update a Payment by the payment_num in the request
exports.update = (req, res) => {
  const payment_num = req.params.payment_num;

  Payment.update(req.body, {
    where: { payment_num: payment_num }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Payment with payment_num=${payment_num}. Maybe Payment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Payment with patient payment_num=" + payment_num
      });
    });
};

// Delete a Payment with the specified payment_num in the request
exports.delete = (req, res) => {
  const payment_num = req.params.payment_num;

  Payment.destroy({
    where: { payment_num: payment_num }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Payment with payment_num=${payment_num}. Maybe Payment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Payment with patient payment_num=" + payment_num
      });
    });
};