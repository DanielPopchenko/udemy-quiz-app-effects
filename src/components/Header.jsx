import React from 'react';
import img from '../assets/quiz-logo.png';

const Header = () => {
  return (
    <header>
      <h1>ReactQuiz</h1>
      <img src={img} alt="Quiz logotype" />
    </header>
  );
};

export default Header;
