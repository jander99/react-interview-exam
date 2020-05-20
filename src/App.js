import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [search, setSearch] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://jsonplaceholder.typicode.com/users',
      );
  
      setData(result.data)
    };

    fetchData();
  }, [])


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
      <div data-testid='resultsDiv'>{JSON.stringify(data)}</div>
    
    </div>
  );
}

export default App;
