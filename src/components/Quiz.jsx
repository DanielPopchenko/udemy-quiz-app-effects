import React, { useState, useCallback } from 'react';
import questions from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question';
import Summary from './Summary';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIdx = userAnswers.length;
  const quizIsComplete = activeQuestionIdx === questions.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevState) => {
      return [...prevState, selectedAnswer];
    });
    //  ! [] - dependensies array like in the useEffect
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    //  ! [] - dependensies array like in the useEffect
    [handleSelectAnswer],
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      {/* До создаия этого компонента у нас была проблема с key,
                из за того что он был одинаковый у нас не работало приложение
                Теперь мы зделали общий компонент с общим key, и при изменении 
                activeQuestionIdx весь этот компонент сотрется и создастся заново
          */}
      <Question
        key={activeQuestionIdx}
        //   ! we cannot use key as our prop, this prop is only for React
        questionIndex={activeQuestionIdx}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
