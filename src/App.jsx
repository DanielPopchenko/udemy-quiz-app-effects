import React from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Quiz />
      </main>
    </div>
  );
};

export default App;
