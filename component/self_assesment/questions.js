export const questions = [
  {
    _id: 1,
    text: "What is your gender ?",
    type: "radio",
    user: {
      _id: 2,
    },
    options: ["male", "female", "other"],
  },

  {
    _id: 2,
    text: "Please type of age",
    options: [],
    type: "textbox",
    user: {
      _id: 2,
    },
  },
  {
    _id: 3,
    text:
      "are you experiencing any of the following are you experiencing any of the following hjhw yuaw uyawud uygawudg",
    options: ["cough", "fever", "Difficulty in berathing", "none"],
    type: "radio",
    user: {
      _id: 2,
    },
  },
  {
    _id: 4,
    text: "Have you ever had any of the following",
    options: [
      "diebities",
      "heart disease",
      "lung disease",
      "hypertension",
      "none",
    ],
    type: "radio",
    user: {
      _id: 2,
    },
  },
  {
    _id: 5,
    text: `Have you travel anywhere internationaly in between 15 march 2020 to 14 apri 2020`,
    options: [],
    type: "radio",
    options: ["Yes", "No"],
    user: {
      _id: 2,
    },
  },
  {
    _id: 6,
    text: "Which of the following is applied to you",
    type: "radio",
    options: [
      "Recently I have meet someone that were positive with corona virus",
      "I am healty government employee and without safety kit I have checked matter of corona virus",
      "none",
    ],
    user: {
      _id: 2,
    },
  },
];
