const router = require("express").Router();
const { Cart } = require("../../models");

// POST to cart
router.post("/", async (req, res) => {
  try {
    const cartData = await Cart.create(req.body);
    res.status(200).json(cartData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE from cart
router.delete("/:id", async (req, res) => {
  try {
    const cartData = await Cart.destroy({
      where: { id: req.params.id },
    });
    if (!cartData) {
      res.status(404).json({ message: "No plant with this id!" });
      return;
    }
    res.status(200).json(cartData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
