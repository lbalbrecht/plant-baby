const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class PlantOrder extends Model {}

PlantOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Store a reference of the `id` of the plant this plant_order belongs to
    plant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "plant",
        key: "id",
      },
    },
    // Store a reference of the `id` of the order this plant_order belongs to
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "order",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "plant_order",
  }
);

module.exports = PlantOrder;
