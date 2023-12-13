import { useState, useEffect } from 'react';

const QuestionTimer = ({ onTimeout, timeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log('Setting timeout');
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };

    //   ! Из за того что при каждом ререндере пересоздается функция, которая является обьектом а они не равны даже если одинаковы
    //   ! -> у нас перезапускается таймер
    //   ? Это можно избежать используя useCallback
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log('Setting interval');
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress id="question-time" max={timeout} value={remainingTime} className={mode} />
  );
};

export default QuestionTimer;
