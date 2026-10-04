const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();

const connectDB = require("../config/db");
const Product = require("../models/Product");

const products = [
  {
    name: "Nova X Smartphone",
    description:
      "A sleek smartphone with a vivid OLED display, fast performance and all-day battery.",
    category: "Electronics",
    price: 29999,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    stock: 18,
    rating: 4.8
  },
  {
    name: "AeroBook Pro 14",
    description:
      "Lightweight laptop designed for work, study and creative projects.",
    category: "Electronics",
    price: 74999,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    stock: 9,
    rating: 4.7
  },
  {
    name: "Urban Runner Sneakers",
    description:
      "Comfortable everyday sneakers with a modern streetwear silhouette.",
    category: "Fashion",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    stock: 30,
    rating: 4.6
  },
  {
    name: "Minimal Watch",
    description:
      "Clean, versatile wristwatch that works for office and casual looks.",
    category: "Fashion",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    stock: 22,
    rating: 4.5
  },
  {
    name: "Studio Headphones",
    description:
      "Over-ear wireless headphones with immersive sound and comfortable cushions.",
    category: "Electronics",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    stock: 15,
    rating: 4.9
  },
  {
    name: "Everyday Backpack",
    description:
      "Spacious, durable backpack with a padded laptop compartment.",
    category: "Accessories",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    stock: 25,
    rating: 4.4
  },
  {
    name: "Ceramic Coffee Set",
    description:
      "Elegant ceramic mug and pour-over set for your daily coffee ritual.",
    category: "Home",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    stock: 35,
    rating: 4.6
  },
  {
    name: "Desk Lamp",
    description:
      "Warm adjustable LED desk lamp for focused work and reading.",
    category: "Home",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    stock: 20,
    rating: 4.5
  }
];

(async () => {
  try {
    await connectDB();

    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log(`Seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
})();