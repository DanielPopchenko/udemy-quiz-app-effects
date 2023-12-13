import { useState } from 'react';
import QuestionTimer from './QuestionTimer';
import Answers from './Answers';
import questions from '../questions';

const Question = ({ questionIndex, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  } else if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (answer) => {
    setAnswer({ selectedAnswer: answer, isCorrect: null });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        // ! The right answer is always the first element of answers
        // ! key here is equals to activeQuestionIdx, so we can use it to
        // ! get the first answer and compare it to selected answer by user
        isCorrect: questions[questionIndex].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  }

  return (
    <div id="question">
      {/* null here means that no answer was chosen */}
      <QuestionTimer
        key={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        timeout={timer}
        mode={answerState}
        //   ! key - имеет другое свойство крому как использование в map
        //   ! в данной ситуации этот компонент перерендерится когда key не будет равен прошлому key
      />

      <h2>{questions[questionIndex].text}</h2>

      {/*         Перед тем как мы создали этот компонент, из за рефа
                вопросы не переключались и оставались на месте
                Теперь я перенес логику в другой компонент
                дал ему key и все ! больше ничего делать не надо.
        */}
      <Answers
        //   ! We are forcing React to destroy and recreate the component
        answers={questions[questionIndex].answers}
        //   ! The latest answer
        selectedAnswer={answer.selectedAnswer}
        answerStateProp={answerState}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
