import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [data, setData] = useState('');
  const [filteredData, setfilteredData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        if (response != null) {
          setData(response.data)
        }
      } catch(error) {
        console.log(error)
      };
    };

    fetchData();
  }, [])

  const filterDataByUsername = (query) => {
    const filtered = data
    .map(user => user.username)
    .filter(username => username.includes(query));
    setfilteredData(filtered)
  }

  const searchBoxChange = event => {
    let val = event.target.value
    if(val.length > 1) {
      filterDataByUsername(val)
    }
  }

  return (
    <div className="App">
      <span>Please search by Username: </span>
      <input data-testid='searchBox'
      type='text'
      onChange={searchBoxChange} />
      <div data-testid='resultsDiv'>{JSON.stringify(filteredData)}</div>
    
    </div>
  );
}

export default App;
