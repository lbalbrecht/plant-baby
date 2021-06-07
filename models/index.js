const User = require("./User");
const Address = require("./Address");
const Inventory = require("./Inventory");
const Plant = require("./Plant");
const Tag = require("./Tag");
const PlantTag = require("./PlantTag");
const Order = require("./Order");
const PlantOrder = require("./PlantOrder");

User.hasOne(Address, {
  foreignKey: "user_id",
});

Address.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasOne(Inventory, {
  foreignKey: "user_id",
});

Inventory.belongsTo(User, {
  foreignKey: "user_id",
});

Inventory.hasMany(Plant, {
  foreignKey: "inventory_id",
});

Plant.belongsTo(Inventory, {
  foreignKey: "inventory_id",
  onDelete: "CASCADE",
});

Plant.belongsToMany(Tag, {
  through: "plant_tag",
  foreignKey: "plant_id",
});

Tag.belongsToMany(Plant, {
  through: "plant_tag",
  foreignKey: "tag_id",
});

Plant.belongsToMany(Order, {
  through: "plant_order",
  foreignKey: "plant_id",
});

Order.belongsToMany(Plant, {
  through: "plant_order",
  foreignKey: "order_id",
});

User.hasMany(Order, {
  foreignKey: "user_id",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Address,
  Inventory,
  Plant,
  Tag,
  PlantTag,
  Order,
  PlantOrder,
};
