const db = require("../config/db");

const addToCart = (req, res) => {
  const userId = req.user.id;
  const { foodId, quantity } = req.body;

  if (!foodId || quantity <= 0) {
  return res.status(400).json({
    message: "Valid foodId and quantity required"
  });
  
}

  const sql =
    "INSERT INTO cart (user_id, food_id, quantity) VALUES (?, ?, ?)";

  db.query(
    sql,
    [userId, foodId, quantity],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Item added to cart",
      });
    }
  );
};

const viewCart = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      cart.id,
      foods.name,
      foods.price,
      cart.quantity
    FROM cart
    JOIN foods
      ON cart.food_id = foods.id
    WHERE cart.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

const removeCartItem = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM cart WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Item removed from cart",
      });
    }
  );
};


const updateCartQuantity = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  db.query(
    "UPDATE cart SET quantity = ? WHERE id = ?",
    [quantity, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Cart quantity updated",
      });
    }
  );
};

module.exports = {
  addToCart,
  viewCart,
  removeCartItem,
  updateCartQuantity,
};