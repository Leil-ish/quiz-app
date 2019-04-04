'use strict';

const quizQuestions = [
    {
      number: 1,
      text: `What phrase is Captain Picard known for saying as the Enterprise sets off on a new course?`,
      ans1: `Let it be.`,
      ans2: `Make it so.`,
      ans3: `Just do it.`,
      ans4: `Tea. Earl Grey. Hot.`
    },

    {
      number: 2,
      text: `What disease led to the Vidiians kidnapping Voyager’s crew to harvest their organs?`,
      ans1: `The Scourge`,
      ans2: `The Plague`,
      ans3: `The Phage`,
      ans4: `Lupus`
    },

    {
      number: 3,
      text: `Commander Benjamin Sisko is a devoted fan of which Earth sport?`,
      ans1: `Baseball`,
      ans2: `Hockey`,
      ans3: `LARPing`,
      ans4: `Ping Pong`
    },

    {
      number: 4,
      text: `What is the nickname of Dr. Leonard H. McCoy?`,
      ans1: `Doc`,
      ans2: `Bones`,
      ans3: `House, M.D.`,
      ans4: `Scotty`
    },

    {
      number: 5, 
      text: `Which security officer was killed off in the first season by a puddle of tar?`,
      ans1: `Lieutenant Tuvok`,
      ans2: `Donna Noble`,
      ans3: `Lieutenant Tasha Yar`,
      ans4: `Lieutenant Worf`
    },

    {
      number: 6,
      text: `The Ferengi bartender on Deep Space Nine shares a name with which particle?`,
      ans1: `Gluon`,
      ans2: `Pion`,
      ans3: `Flux Capacitor`,
      ans4: `Quark`
    },

    {
      number:7,
      text: `Which TV icon overruled the production company’s board of directors to green-light filming of the TOS pilot?`,
      ans1: `Andy Griffith, with the condition that the phasers must always be set to “Stun”`,
      ans2: `Lucille Ball, because she believed the series was about traveling USO performers`,
      ans3: `Dick Van Dyke, who wanted to cast himself as an alien`,
      ans4: `Kim Kardashian, to break the internet`
    },

    {
      number: 8,
      text: `Which character spent 7 seasons trying to choose a name for himself?`,
      ans1: `Data`,
      ans2: `The Doctor`,
      ans3: `The Artist Formerly Known As Prince`,
      ans4: `Odo`
    },

    {
      number: 9,
      text: `Which character appears in the greatest total number of episodes in the franchise?`,
      ans1: `Worf, Son of Mogh`,
      ans2: `Jean Luc Picard`,
      ans3: `Waldo`,
      ans4: `Miles O\`Brien`
    },

    {
      number: 10,
      text: `What happens to Tom Paris and Kathryn Janeway when they pass the Warp 10 threshold?`,
      ans1: `They receive an upload of valuable navigation data`,
      ans2: `They go REALLY fast`,
      ans3: `They turn into lizard-like creatures and mate with each other`,
      ans4: `They enter the homeworld of the Q Continuum`
    }
];

const solutions = [
  `Make it so.`,
  `The Phage`,
  `Baseball`,
  `Bones`,
  `Lieutenant Tasha Yar`,
  `Quark`,
  `Lucille Ball, because she believed the series was about traveling USO performers`,
  `The Doctor`,
  `Worf, Son of Mogh`,
  `They turn into lizard-like creatures and mate with each other`
]

let questionNum = 1;

let correctAnswers = 0;

function questionPage(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="form">
    <h2 class="question">${question.text}</h2>
    
    <form>
      <fieldset class="options">
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="progress">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function handleStart() {
  $('#js-engage-button').click(function(event) {
    nextQuestion();
  });
}

function nextQuestion() {
  const question = quizQuestions[questionNum - 1];
  const questionsAnswered = questionNum - 1;
  $('#container').html(questionPage(correctAnswers, question, questionsAnswered));
}

function handleSubmit() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const thatIsRight = checkAnswer(answer);
    if(thatIsRight) {
      returnCorrectFeedback();
    } else {
      returnIncorrectFeedback();
    }
  });
}

function checkAnswer(answer) {
  if(answer.text() === solutions[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function returnCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2 id="affirmative">Affirmative!</h2>
    <img src="https://media.giphy.com/media/msKNSs8rmJ5m/giphy.gif" id=yesFeedbackImg alt="Data celebrating">
    <button id="js-next-button">Next</button>
  </section>
`;

function returnIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2 id="negative">Negative! The answer you're looking for is "${solutions[questionNum - 1]}"</h2>
      <img src="https://media.giphy.com/media/u4PP8qvsj5i1O/giphy.gif" id="noFeedbackImg" alt="Wesley Crusher facepalm">
      <button id="js-next-button">Next</button>
    </section>
`;
}

function handleNext() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestart() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page">
      <h2 class="analysis">Ultimate analysis: ${correctAnswers} out of 10</h2>
      <button id="js-restart-button">Trek Again?</button>
    </section>
  `);
}

function handleButtons() {
  handleStart();
  handleSubmit();
  handleNext();
  handleRestart();
}

handleButtons();