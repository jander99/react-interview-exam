import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        if (response != null) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [])

  const filterDataByUsername = (query) => {
    if (data != null && data.length > 0) {
      const filtered = data
        .map(user => user.username)
        .filter(username => username.startsWith(query));
      setFilteredData(filtered);
    }
  }

  const handleSearchBoxChange = ev => {
    if(ev.target.value.length > 1) {
      filterDataByUsername(ev.target.value);
    }
  }

  return (
    <div className="App">
      <span>Please search by Username: </span>
      <input data-testid='searchBox'
        type='text'
        onChange={handleSearchBoxChange} />
      <div data-testid='resultsDiv'>{JSON.stringify(filteredData)}</div>
    </div>
  );
}

export default App;
