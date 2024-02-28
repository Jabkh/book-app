import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookRouter from './routes/bookRouter';

function App() {
  return (
    <Router>
      <div className="App">
        <BookRouter />
      </div>
    </Router>
  );
}

export default App;
