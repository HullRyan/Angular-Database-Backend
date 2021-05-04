const db = require("../models");
const Health_record = db.models.health_record;
const Op = db.Sequelize.Op;

//Create a Health_record
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be blank"
        });
        return;
    }

    const health_record = {
        patient_id: req.body.patient_id,
        disease: req.body.disease,
        status: req.body.status,
        desc: req.body.desc,
        date: req.body.date
    }

    Health_record.create(health_record).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Health_record."
          });
    });
};

// Retrieve all Health_record from the database.
exports.findAll = (req, res) => {
  const patient_id = req.query.patient_id;
  var condition = patient_id ? { patient_id: { [Op.like]: `%${patient_id}%` } } : null;

  Health_record.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Health_records."
      });
    });
};

// Find a single Health_record with an id
exports.findOne = (req, res) => {
  const patient_id = req.params.patient_id;

  Health_record.findByPk(patient_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Health_record with patient id=" + patient_id
      });
    });
};

// Update a Health_record by the id in the request
exports.update = (req, res) => {
  const patient_id = req.params.patient_id;

  Health_record.update(req.body, {
    where: { patient_id: patient_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Health_record was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Health_record with patient_id=${patient_id}. Maybe Health_record was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Health_record with patient id=" + patient_id
      });
    });
};

// Delete a Health_record with the specified id in the request
exports.delete = (req, res) => {
  const patient_id = req.params.patient_id;

  Health_record.destroy({
    where: { patient_id: patient_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Health_record was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Health_record with id=${patient_id}. Maybe Health_record was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Health_record with patient id=" + patient_id
      });
    });
};