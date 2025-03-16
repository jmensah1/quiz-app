const fs = require('fs');
const path = require('path');

// Load the questions.json file
const questionsPath = path.join(__dirname, 'questions.json');
const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

// Remove duplicate questions
const uniqueQuestions = [];
const questionSet = new Set();

questionsData.results.forEach(question => {
  if (!questionSet.has(question.question)) {
    uniqueQuestions.push(question);
    questionSet.add(question.question);
  }
});

// Update the questions.json file with unique questions
questionsData.results = uniqueQuestions;
fs.writeFileSync(questionsPath, JSON.stringify(questionsData, null, 2));

console.log('Duplicate questions removed successfully.');