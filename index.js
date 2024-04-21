


// creating an array of questions
let myQuestions = [
  {
      // question
      question: "Does your child tend to give random answers to questions, or make random comments ?",
      answers: {
          //  possible answers
          Yes:"",
          Sometimes:"",
          No:""
      }
  },
  {
      question: "Is your child easily upset by small changes? ",
      answers: {
          Yes:"",
          Sometimes:"",
          No:""
      }
  },
  {
      question: " Does your child have obsessive interests?",
      answers: {
          Yes:"",
          Sometimes:"",
          No:""
      }
  },
  {
      question: "Does your child engage in repetitive behaviors such as hand-flapping, toe-walking, pacing, or lining up objects? ",
      answers: {
          Yes:"",
          Sometimes:"",
          No:""
      }
  },
  {
      question: " Is your child over or under-sensitive to smells, tastes, or touch?",
      answers: {
          Yes:"",
          Sometimes:"",
          No:""
      }
  },
  {
      question: " Does your child not respond to their name?",
      answers: {
          Yes:"",
          Sometimes:"",
          No:""
      }
  },
  {
      question: "Does your child appear to notice unusual details that others miss? ",
      answers: {
          Yes:"",
          Sometimes:"",
          No:""
      }
  },
  {
      question: "Does your child get upset by everyday noises? (For example, do they scream or cry over noise such as a vacuum cleaner or loud music?) ",
      answers: {
          Yes:"",
          Sometimes:"",
          No:""
      }
  },
  {
      question: "Does your child practice toe walking? ",
      answers: {
          Yes:"",
          Sometimes:"",
          No :""
      }
  },
];



window.onload = function() {
  let reloadCount = localStorage.getItem("reloadCount") || 0;
  
  // Check if the warning has been shown before or if the reload count exceeds 10
  if (!localStorage.getItem("hasShownWarning") || reloadCount >= 10) {
      // Display the warning popup
      let warningPopup = document.getElementById("warningPopUp");
      if (warningPopup) {
          warningPopup.style.display = "block";
      }
      
      // Reset the reload count and remove the flag indicating the warning has been shown
      localStorage.setItem("reloadCount", 0);
      localStorage.removeItem("hasShownWarning");
  } else {
      // Increment the reload count and update it in localStorage
      reloadCount++;
      localStorage.setItem("reloadCount", reloadCount);
  }
};

// Function to close the warning popup
function closePopup() {
  let warningPopup = document.getElementById("warningPopUp");
  if (warningPopup) {
      // Hide the warning popup
      warningPopup.style.display = "none";
      // Set the flag indicating that the warning has been shown
      localStorage.setItem("hasShownWarning", "true");
  }
}

// Function to close the result popup
function closeResultPopup() {
  // Reload the page when OK is clicked
  window.scrollTo(0, 0);
  location.reload();
}

// Function to display the result popup
function showResultPopup(resultMessage) {
  // Create the popup element
  let popup = document.createElement('div');
  popup.className = 'popup';

  // Set the content of the popup based on the result message
  popup.textContent = resultMessage;

  // Create the OK button for the popup
  let okButton = document.createElement('button');
  okButton.textContent = 'OK';
  okButton.addEventListener('click', closeResultPopup);

  // Append the OK button to the popup
  popup.appendChild(okButton);

  // Append the popup to the body
  document.body.appendChild(popup);
}


// Function to display the questions 
function showQuestions(questions, quizContainer) {
  // array to store content for each question
  let output = [];
  // we store the answers in this variable
  let answers;
  // this is a loop to loop through each question
  for (let i = 0; i < questions.length; i++) {
      answers = [];
      // loop through each answers variants 
      for (let letter in questions[i].answers) {
          // Construct HTML for each answer option
          answers.push(
              '<label>' +
              '<input type="radio"  name="question' +  i + '" value="' + letter + '">' +
              letter + ': ' + questions[i].answers[letter] +
              '</label>'
          );
      }
      // Construct HTML for the question and its answers
      output.push(
          '<div class="question">' + questions[i].question + '</div>' +
          '<div class="answers">' + answers.join('') + '</div>'
      );
  }

  quizContainer.innerHTML = output.join('');
}

let quizContainer = document.getElementById('quiz');
showQuestions(myQuestions, quizContainer);

let submitButton = document.getElementById('submit');
// Adding a click event listener to the submit button
submitButton.onclick = function() {
     // Creating an array to store selected answers
  let selectedAnswers = [];
// Looping through each question in the questions array
  for (let i = 0; i < myQuestions.length; i++) {
      let questionName = "question" + i;
      // Selecting the checked radio input for the current question
      let selectedOption = document.querySelector('input[name="' + questionName + '"]:checked');

      if (selectedOption) {
         // Pushing the value of the selected answer to the selectedAnswers array
          selectedAnswers.push(selectedOption.value);
      }
  }
  // counting the number of selected answers for each option
  let countNo = selectedAnswers.filter(answer => answer === "No").length;
  let countSometimes = selectedAnswers.filter(answer => answer === "Sometimes").length;
  let countYes = selectedAnswers.filter(answer => answer === "Yes").length;

  // Determine the result message based on the quiz results
  let resultMessage;
  if (countNo >= 6) {
      resultMessage = "There's no cause for concern. Cherish every moment with your child.";
  } else if (countYes > 3) {
      resultMessage = " It's imperative to visit a hospital for a thorough assessment by medical professionals.";
  } else if ((countYes + countSometimes) >= 4) {
      resultMessage = " We advise seeking medical attention at a hospital for your child.";
  } else if (countYes === 2 && countNo >= 6) {
      resultMessage = "While the results don't indicate an urgent situation, it's important to monitor your child's behavior.";
  } else {
      resultMessage = "Please fill the form.";
  }

  // Show the result popup with the determined message
  showResultPopup(resultMessage);
};




















