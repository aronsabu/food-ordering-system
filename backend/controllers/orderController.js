const db = require("../config/db");

// Place Order
const placeOrder = (req, res) => {
  const userId = req.user.id;

  const cartQuery = `
    SELECT cart.food_id,
           cart.quantity,
           foods.price
    FROM cart
    JOIN foods
      ON cart.food_id = foods.id
    WHERE cart.user_id = ?
  `;

  db.query(cartQuery, [userId], (err, cartItems) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    let totalAmount = 0;

    cartItems.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    db.query(
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
      [userId, totalAmount],
      (err, orderResult) => {
        if (err) {
          return res.status(500).json(err);
        }

        const orderId = orderResult.insertId;

        cartItems.forEach(item => {
          db.query(
            `INSERT INTO order_items
             (order_id, food_id, quantity, price)
             VALUES (?, ?, ?, ?)`,
            [
              orderId,
              item.food_id,
              item.quantity,
              item.price
            ]
          );
        });

        db.query(
          "DELETE FROM cart WHERE user_id = ?",
          [userId]
        );

        res.status(201).json({
          message: "Order placed successfully",
          orderId,
          totalAmount
        });
      }
    );
  });
};

// Get User Orders
const getUserOrders = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
};

// Get Order Details
const getOrderDetails = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      foods.name AS food_name,
      order_items.quantity,
      order_items.price
    FROM order_items
    JOIN foods
      ON order_items.food_id = foods.id
    WHERE order_items.order_id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      orderId: id,
      items: results,
    });
  });
};

// Update Order Status (Admin)
const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql =
    "UPDATE orders SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Order status updated successfully",
    });
  });
};

// Get All Orders (Admin)
const getAllOrders = (req, res) => {

  const sql = `
    SELECT
      orders.id,
      users.name AS user_name,
      orders.total_amount,
      orders.status,
      orders.created_at
    FROM orders
    JOIN users
      ON orders.user_id = users.id
    ORDER BY orders.created_at DESC
  `;

  db.query(sql, (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);

  });
};

module.exports = {
  placeOrder,
  getUserOrders,
  getOrderDetails,
  updateOrderStatus,
  getAllOrders,
};