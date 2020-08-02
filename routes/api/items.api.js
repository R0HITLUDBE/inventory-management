const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.middleware");

// item model
const Item = require("../../models/items.model");

// @route GET api/items
// desc Get All Items
// @access private

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// desc Create A Item
// @access public

router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    expiryDate: req.body.expiryDate,
    status: req.body.status,
    maxLendLimit: req.body.maxLendLimit,
  });

  newItem.save().then((item) => res.json(item));
});

// @route DELETE api/items
// desc Delete A Item
// @access public

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).send({ success: false }));
});

// @route PUT api/items
// desc Update A Item
// @access public

router.put("/:id", (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
    .then((item) => {
      if (!item) {
        return res.status(404).end();
      }
      return res.status(200).json(item);
    })
    .catch((err) => next(err));
});

module.exports = router;
