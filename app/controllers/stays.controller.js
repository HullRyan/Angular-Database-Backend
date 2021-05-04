const db = require("../models");
const Stay = db.models.stays;
const Op = db.Sequelize.Op;

//Create a Stay
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be blank"
        });
        return;
    }

    const stay = {
        patient_id: req.body.patient_id,
        room_num: req.body.room_num,
        days: req.body.days,
        invoice_num: req.body.invoice_num
    }

    Stay.create(stay).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Stay."
          });
    });
};

// Retrieve all Stay from the database.
exports.findAll = (req, res) => {
  const patient_id = req.query.patient_id;
  var condition = patient_id ? { patient_id: { [Op.like]: `%${patient_id}%` } } : null;

  Stay.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Stays."
      });
    });
};

// Find a single Stay with an patient_id
exports.findOne = (req, res) => {
  const patient_id = req.params.patient_id;

  Stay.findByPk(patient_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Stay with stay num=" + patient_id
      });
    });
};


// Update a Stay by the patient_id in the request
exports.update = (req, res) => {
  const patient_id = req.params.patient_id;

  Stay.update(req.body, {
    where: { patient_id: patient_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Stay was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Stay with patient_id=${patient_id}. Maybe Stay was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Stay with patient_id=" + patient_id
      });
    });
};

// Delete a Stay with the specified patient_id in the request
exports.delete = (req, res) => {
  const patient_id = req.params.patient_id;

  Stay.destroy({
    where: { patient_id: patient_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Stay was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Stay with patient_id=${patient_id}. Maybe Stay was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Stay with patient patient_id=" + patient_id
      });
    });
};