const db = require("../models");
const Drug = db.models.drug;
const Op = db.Sequelize.Op;

//Create a Drug
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be blank"
        });
        return;
    }

    const drug = {
        patient_id: req.body.patient_id,
        amount: req.body.amount,
        kind: req.body.kind,
        nurse_id: req.body.nurse_id,
        date: req.body.date
    }

    Drug.create(drug).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Drug."
          });
    });
};

// Retrieve all Drug from the database.
exports.findAll = (req, res) => {
  const patient_id = req.query.patient_id;
  var condition = patient_id ? { patient_id: { [Op.like]: `%${patient_id}%` } } : null;

  Drug.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Drugs."
      });
    });
};

// Find a single Drug with an id
exports.findOne = (req, res) => {
  const patient_id = req.params.patient_id;

  Drug.findByPk(patient_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Drug with patient id=" + patient_id
      });
    });
};

// Update a Drug by the id in the request
exports.update = (req, res) => {
  const patient_id = req.params.patient_id;

  Drug.update(req.body, {
    where: { patient_id: patient_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Drug was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Drug with patient_id=${patient_id}. Maybe Drug was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Drug with patient id=" + patient_id
      });
    });
};

// Delete a Drug with the specified id in the request
exports.delete = (req, res) => {
  const patient_id = req.params.patient_id;

  Drug.destroy({
    where: { patient_id: patient_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Drug was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Drug with id=${patient_id}. Maybe Drug was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Drug with patient id=" + patient_id
      });
    });
};