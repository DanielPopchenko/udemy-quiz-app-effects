import { useRef } from 'react';

const Answers = ({ answers, selectedAnswer, answerStateProp, onSelectAnswer }) => {
  const shuffledAnswers = useRef();
  // ! Из за того что значение рефа сохраняется независимо от ререндеров
  // ! Порядок ответов при ответе юзера не меняется, а остается таким же
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        //   ! Проверяем тот ли вопрос мы выбрали
        const isSelected = selectedAnswer === answer;
        let cssClasses = '';

        if (answerStateProp === 'answered' || isSelected) {
          cssClasses = 'selected';
        }

        if (
          (answerStateProp === 'correct' || answerStateProp === 'wrong') &&
          isSelected
        ) {
          cssClasses = answerStateProp;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelectAnswer(answer)}
              className={cssClasses}
              disabled={selectedAnswer !== ''}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
