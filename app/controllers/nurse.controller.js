const db = require("../models");
const Nurse = db.models.nurse;
const Op = db.Sequelize.Op;

//Create a Nurse
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be blank"
        });
        return;
    }

    const nurse = {
        id: req.body.id,
        cert_num: req.body.cert_num,
        name: req.body.name,
        address: req.body.address,
        phone_num: req.body.phone_num
    }

    Nurse.create(nurse).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Nurse."
          });
    });
};

// Retrieve all Nurse from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Nurse.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Nurses."
      });
    });
};

// Find a single Nurse with an id
exports.findOneId = (req, res) => {
  const id = req.params.id;

  Nurse.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Nurse with nurse num=" + id
      });
    });
};

// Find a single Nurse with an name
exports.findOneName = (req, res) => {
    const name = req.params.name;
  
    Nurse.findByPk(name)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Nurse with nurse num=" + name
        });
      });
  };
  

// Update a Nurse by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Nurse.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Nurse was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Nurse with id=${id}. Maybe Nurse was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Nurse with patient id=" + id
      });
    });
};

// Delete a Nurse with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Nurse.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Nurse was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Nurse with id=${id}. Maybe Nurse was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Nurse with patient id=" + id
      });
    });
};