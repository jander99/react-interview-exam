import React, { useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [search, setSearch] = useState('');

  const searchBoxChange = e => {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <span>Please search by Username: </span>
      <input data-testid='searchBox'
      type='text'
      value={search}
      onChange={searchBoxChange} />
      <div data-testid='resultsDiv'></div>
    
    </div>
  );
}

export default App;
