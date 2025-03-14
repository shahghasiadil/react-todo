import React from 'react';
import { TodoApp } from './components/TodoApp';
import './styles/TodoApp.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
};

export default App;
