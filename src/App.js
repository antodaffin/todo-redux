import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateTodo from './CreateTodo'
import Tables from './Tables'

function App() {
  return (
    <div className="App">
     <CreateTodo/>
     <Tables/> 
    </div>
  );
}

export default App;
