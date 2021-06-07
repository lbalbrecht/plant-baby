const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class PlantTag extends Model {}

PlantTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Store a reference of the `id` of the plant this plant_tag belongs to
    plant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "plant",
        key: "id",
      },
    },
    // Store a reference of the `id` of the tag this plant_tag belongs to
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "plant_tag",
  }
);

module.exports = PlantTag;
