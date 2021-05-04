

const db = require("../models");
const Cares = db.models.cares;
const Op = db.Sequelize.Op;

//Create a care
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be blank"
        });
        return;
    }

    const care = {
        patient_id: req.body.patient_id,
        care_desc: req.body.care_desc,
        care_date: req.body.care_date
    }

    Cares.create(care).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Care."
          });
    });
};

// Retrieve all Cares from the database.
exports.findAll = (req, res) => {
  const patient_id = req.query.patient_id;
  var condition = patient_id ? { patient_id: { [Op.like]: `%${patient_id}%` } } : null;

  Cares.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Cares."
      });
    });
};

// Find a single Care with an id
exports.findOne = (req, res) => {
  const patient_id = req.params.patient_id;

  Cares.findByPk(patient_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Care with patient id=" + patient_id
      });
    });
};

// Update a Care by the id in the request
exports.update = (req, res) => {
  const patient_id = req.params.patient_id;

  Cares.update(req.body, {
    where: { patient_id: patient_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Care was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Cares with patient_id=${patient_id}. Maybe Care was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Care with patient id=" + patient_id
      });
    });
};

// Delete a Care with the specified id in the request
exports.delete = (req, res) => {
  const patient_id = req.params.patient_id;

  Cares.destroy({
    where: { patient_id: patient_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Care was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Care with id=${patient_id}. Maybe Care was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Care with patient id=" + patient_id
      });
    });
};