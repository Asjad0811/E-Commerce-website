const Order = require("../models/Order");
const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    const { items, shipping } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const ids = items.map(i => i.product);
    const products = await Product.find({ _id: { $in: ids } });
    const map = new Map(products.map(p => [String(p._id), p]));

    const normalized = [];
    let total = 0;

    for (const item of items) {
      const product = map.get(String(item.product));
      const quantity = Math.max(1, Number(item.quantity || 1));

      if (!product) return res.status(400).json({ message: "A product no longer exists" });
      if (product.stock < quantity) {
        return res.status(400).json({ message: `${product.name} does not have enough stock` });
      }

      normalized.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity
      });
      total += product.price * quantity;
    }

    for (const item of normalized) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    const order = await Order.create({
      user: req.user.id,
      items: normalized,
      shipping,
      total
    });

    res.status(201).json(await order.populate("items.product"));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.mine = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
