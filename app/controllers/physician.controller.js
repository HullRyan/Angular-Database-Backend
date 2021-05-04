const db = require("../models");
const Physician = db.models.physician;
const Op = db.Sequelize.Op;

//Create a Physician
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be blank"
        });
        return;
    }

    const physician = {
        id: req.body.id,
        cert_num: req.body.cert_num,
        field: req.body.field,
        name: req.body.name,
        address: req.body.address,
        phone_num: req.body.phone_num
    }

    Physician.create(physician).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Physician."
          });
    });
};

// Retrieve all Physician from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Physician.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Physicians."
      });
    });
};

// Find a single Physician with an id
exports.findOneId = (req, res) => {
  const id = req.params.id;

  Physician.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Physician with physician num=" + id
      });
    });
};

// Find a single Physician with an name
exports.findOneName = (req, res) => {
    const name = req.params.name;
  
    Physician.findByPk(name)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Physician with physician name=" + name
        });
      });
  };
  

// Update a Physician by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Physician.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Physician was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Physician with id=${id}. Maybe Physician was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Physician with patient id=" + id
      });
    });
};

// Delete a Physician with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Physician.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Physician was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Physician with id=${id}. Maybe Physician was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Physician with patient id=" + id
      });
    });
};