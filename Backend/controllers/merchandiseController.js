const Merchandise = require("../models/merchandiseModel");

const getAllMerchandise = async (req, res) => {
  try {
    const merchandise = await Merchandise.find();
    res.status(200).json(merchandise);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch merchandise items" });
  }
};

const getMerchandiseById = async (req, res) => {
  try {
    const item = await Merchandise.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Error fetching item details" });
  }
};

const addMerchandise = async (req, res) => {
  try {
    const newItem = new Merchandise(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Error adding merchandise item" });
  }
};

const updateMerchandise = async (req, res) => {
  try {
    const updatedItem = await Merchandise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ error: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating item details" });
  }
};

const deleteMerchandise = async (req, res) => {
  try {
    const deletedItem = await Merchandise.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
};

module.exports = {
  getAllMerchandise,
  getMerchandiseById,
  addMerchandise,
  updateMerchandise,
  deleteMerchandise,
};
