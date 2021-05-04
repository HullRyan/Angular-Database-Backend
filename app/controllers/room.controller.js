const db = require("../models");
const Room = db.models.room;
const Op = db.Sequelize.Op;

//Create a Room
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be blank"
        });
        return;
    }

    const room = {
        room_num: req.body.room_num,
        capacity: req.body.capacity,
        fee: req.body.fee
    }

    Room.create(room).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Room."
          });
    });
};

// Retrieve all Room from the database.
exports.findAll = (req, res) => {
  const room_num = req.query.room_num;
  var condition = room_num ? { room_num: { [Op.like]: `%${room_num}%` } } : null;

  Room.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Rooms."
      });
    });
};

// Find a single Room with an room_num
exports.findOne = (req, res) => {
  const room_num = req.params.room_num;

  Room.findByPk(room_num)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Room with room num=" + room_num
      });
    });
};

// Update a Room by the room_num in the request
exports.update = (req, res) => {
  const room_num = req.params.room_num;

  Room.update(req.body, {
    where: { room_num: room_num }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Room was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Room with room_num=${room_num}. Maybe Room was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Room with room_num=" + room_num
      });
    });
};

// Delete a Room with the specified room_num in the request
exports.delete = (req, res) => {
  const room_num = req.params.room_num;

  Room.destroy({
    where: { room_num: room_num }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Room was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Room with room_num=${room_num}. Maybe Room was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Room with  room_num=" + room_num
      });
    });
};