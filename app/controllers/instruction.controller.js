const db = require("../models");
const Instruction = db.models.instruction;
const Op = db.Sequelize.Op;

//Create a Instruction
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be blank"
        });
        return;
    }

    const instruction = {
        code: req.body.code,
        instructions_fee: req.body.instructions_fee,
        desc: req.body.desc,
        order_date: req.body.order_date,
        execute_date: req.body.execute_date,
        status: req.body.status,
        phys_id: req.body.phys_id,
        nurse_id: req.body.nurse_id,
        patient_id: req.body.patient_id,
        invoice_num: req.body.invoice_num
    }

    Instruction.create(instruction).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Instruction."
          });
    });
};

// Retrieve all Instruction from the database.
exports.findAll = (req, res) => {
  const code = req.query.code;
  var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;

  Instruction.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Instructions."
      });
    });
};

// Find a single Instruction with an id
exports.findOneId = (req, res) => {
  const patient_id = req.params.patient_id;

  Instruction.findByPk(patient_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Instruction with patient id=" + patient_id
      });
    });
};

// Find a single Instruction with a code
exports.findOneCode = (req, res) => {
    const code = req.params.code;
  
    Instruction.findByPk(code)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Instruction with code =" + code
        });
      });
  };

// Update a Instruction by the code in the request
exports.update = (req, res) => {
  const code = req.params.code;

  Instruction.update(req.body, {
    where: { code: code }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Instruction was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Instruction with code=${code}. Maybe Instruction was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Instruction with patient id=" + code
      });
    });
};

// Delete a Instruction with the specified id in the request
exports.delete = (req, res) => {
  const code = req.params.code;

  Instruction.destroy({
    where: { code: code }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Instruction was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Instruction with id=${code}. Maybe Instruction was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Instruction with patient id=" + code
      });
    });
};