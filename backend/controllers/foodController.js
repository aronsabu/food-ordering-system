const db = require("../config/db");

// Add Food
const addFood = (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price || price <= 0) {
    return res.status(400).json({
      message: "Valid name and price are required"
    });
  }

  const image = req.file
    ? req.file.filename
    : null;

  const sql = `
    INSERT INTO foods
    (name, description, price, image)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      description,
      price,
      image
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Food added successfully",
        image,
      });
    }
  );
};

// Get All Foods
const getFoods = (req, res) => {
  db.query(
    "SELECT * FROM foods",
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
};

// Update Food
const updateFood = (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const sql =
    "UPDATE foods SET name=?, description=?, price=? WHERE id=?";

  db.query(
    sql,
    [name, description, price, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Food updated successfully",
      });
    }
  );
};

// Delete Food
const deleteFood = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM foods WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Food deleted successfully",
      });
    }
  );
};

const searchFoods = (req, res) => {
  const { name } = req.query;

  const sql =
    "SELECT * FROM foods WHERE name LIKE ?";

  db.query(
    sql,
    [`%${name}%`],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
};

module.exports = {
  addFood,
  getFoods,
  updateFood,
  deleteFood,
  searchFoods,
};