import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [search, setSearch] = useState('');
  const [data, setData] = useState('');
  const [filteredData, setfilteredData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://jsonplaceholder.typicode.com/users')
      .then(r => {
        setData(r.data)
      })
      .catch(e => {
        console.log(e)
      });
    };

    fetchData();
  }, [])

  const filterDataByUsername = () => {
    console.log(data)
    //data.map(d => console.log(d))
  }

  const searchBoxChange = e => {
    setSearch(e.target.value);
    if(e.target.value.length > 1) {
      filterDataByUsername()
    }
  }

  return (
    <div className="App">
      <span>Please search by Username: </span>
      <input data-testid='searchBox'
      type='text'
      value={search}
      onChange={searchBoxChange} />
      <div data-testid='resultsDiv'>{JSON.stringify(filteredData)}</div>
    
    </div>
  );
}

export default App;
