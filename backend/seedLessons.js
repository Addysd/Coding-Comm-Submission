const mongoose = require('mongoose');
const Lesson = require('./models/Lesson'); // Adjust path if needed
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected...');
}).catch((err) => {
  console.error('MongoDB connection failed:', err.message);
});

// Define the lesson data
const lessons = [
  {
    title: "Lesson 1",
    subtitle: "Introduction to Programming",
    theoryContent: "This is the theory content for Lesson 1.",
    subLessons: [
      { title: "What is Programming?", content: "Learn about programming basics." },
      { title: "Hello World Program", content: "Write your first Hello World program." },
    ],
    codingQuestions: [
      {
        title: "Reverse a String",
        difficulty: "Easy",
        description: "Write a function to reverse a string.",
      },
    ],
  },
  {
    title: "Lesson 2",
    subtitle: "Data Structures",
    theoryContent: "This is the theory content for Lesson 2.",
    subLessons: [
      { title: "Introduction to Arrays", content: "Learn about arrays." },
      { title: "Introduction to Linked Lists", content: "Understand linked lists." },
    ],
    codingQuestions: [
      {
        title: "Implement a Stack",
        difficulty: "Medium",
        description: "Write a class to implement a stack.",
      },
    ],
  },
];


// Seed the database
const seedLessons = async () => {
  try {
    // Clear existing lessons (optional)
    await Lesson.deleteMany();
    console.log('Existing lessons cleared.');

    // Insert new lessons
    await Lesson.insertMany(lessons);
    console.log('Lessons added successfully.');

    // Close the connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding lessons:', err.message);
    mongoose.connection.close();
  }
};

// Run the seed function
seedLessons();
