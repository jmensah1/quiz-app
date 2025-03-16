const calculateGrade = score => {
  if (score === null || score === undefined || typeof score !== 'number') {
    return null;
  }

  const percentage = parseInt(score);

  let grade = null;
  let remarks = null;

  if (percentage >= 80) {
    grade = 'A';
  } else if (percentage >= 75 && percentage <= 79) {
    grade = 'B+';
  } else if (percentage >= 70 && percentage <= 74) {
    grade = 'B';
  }  else if (percentage >= 65 && percentage <= 69) {
    grade = 'B-';
  } else if (percentage >= 60 && percentage <= 64) {
    grade = 'C+';
  } else if (percentage >= 55 && percentage <= 59) {
    grade = 'C';
  } else if (percentage >= 50 && percentage <= 54) {
    grade = 'C-';
  } else if (percentage >= 45 && percentage <= 49) {
    grade = 'D';
  } else if (percentage >= 0 && percentage <= 44) {
    grade = 'F';
  }

  if (score >= 80) {
    remarks = "Outstanding! You've mastered this Course. Well done!";
  } else if (score >= 75 && score <= 79) {
    remarks = "Great job! You've excelled in this quiz.";
  } else if (score >= 70 && score <= 74) {
    remarks = "Good effort! You've passed the quiz.";
  } else if (score >= 65 && score <= 69) {
    remarks = "You've passed, but there's potential for improvement.";
  } else if (score >= 65 && score <= 69) {
    remarks = "Learning is a journey. Keep going, and you'll get there.";
  } else if (score >= 60 && score <= 64) {
    remarks = "Learning is a journey. Keep going, and you'll get there.";
  } else if (score >= 55 && score <= 59) {
      remarks = "Learning is a journey. Keep going, and you'll get there.";
  } else if (score >= 50 && score <= 54) {
    remarks = "Learning is a journey. Keep going, and you'll get there.";
  } else if (score >= 45 && score <= 49) {
    remarks = "Learning is a journey. Keep going, and you'll get there.";
  } else if (score >= 0 && score <= 44) {
    remarks = "Learning is a journey. Keep going, and you'll get there.";
  }

  return {
    grade,
    remarks,
  };
};

export default calculateGrade;
