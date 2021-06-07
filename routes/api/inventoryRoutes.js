// localhost:3001/api/inventory
const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth");
const { Inventory, Plant, User } = require("../../models");

// WORKING
// CREATE an inventory
// localhost:3001/api/inventory
router.post("/", tokenAuth, async (req, res) => {
  try {
    const newInventory = await Inventory.create(req.body);
    res.status(200).json(newInventory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//WORKING
// GET inventory by id & associated plants
// localhost:3001/api/inventory/:id
router.get("/:id", tokenAuth, async (req, res) => {
  try {
    const inventoryData = await Inventory.findOne({
      where: { id: req.params.id },
      include: Plant,
    });
    if (!inventoryData) {
      res.status(404).json({ message: "No inventory found with that id!" });
      return;
    }
    res.status(200).json(inventoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//WORKING
// UPDATE an inventory by id
// localhost:3001/api/inventory/:id
router.put("/:id", tokenAuth, async (req, res) => {
  try {
    const updatedInventoryData = await Inventory.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedInventoryData) {
      res.status(400).json({ message: "No such inventory" });
      return;
    }
    res.status(200).json(updatedInventoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//WORKING
// DELETE an inventory completely
// localhost:3001/api/inventory/:id
router.delete("/:id", tokenAuth, async (req, res) => {
  try {
    const inventoryData = await Inventory.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!inventoryData) {
      res.status(404).json({ message: "No inventory found with that id!" });
      return;
    }
    res.status(200).json(inventoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
