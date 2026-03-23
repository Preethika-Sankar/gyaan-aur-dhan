// seed.js
const mongoose = require("mongoose");
require("dotenv").config();
const Post = require("./models/Post");

// ✅ No need for useNewUrlParser or useUnifiedTopology in Mongoose v7+
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected for seeding"))
  .catch(err => console.error("❌ Connection error:", err));

async function seedPosts() {
  try {
    // Clear existing posts
    await Post.deleteMany({});

    // Insert sample posts
    await Post.insertMany([
      {
        title: "Welcome to the Community!",
        content: "This is our first post. Feel free to share your thoughts!",
        author: "Admin"
      },
      {
        title: "Book Discussion",
        content: "Let’s talk about your favorite books and authors.",
        author: "Guest User"
      },
      {
        title: "Upcoming Event",
        content: "Join us for a live webinar on financial literacy this weekend.",
        author: "Community Team"
      }
    ]);

    console.log("✅ Sample posts seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding posts:", err);
    mongoose.connection.close();
  }
}

seedPosts();