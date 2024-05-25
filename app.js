import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:9876/numbers';

function App() {
  const [numberId, setNumberId] = useState('');
  const [data, setData] = useState({
    windowPrevState: [],
    windowCurrState: [],
    numbers: [],
    avg: null,
  });

  const handleChange = (event) => {
    setNumberId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/${numberId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setNumberId('');
  }, [data]);

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <form onSubmit={handleSubmit}>
        
        <select>
              <option value="prime">prime</option>
              <option value="fibonacci">fibonacii</option>
              <option value="even">even</option>
              <option value="random">random</option>
        </select>

        
        <input
          type="text"
          id="numberId"
          value={numberId}
          onChange={handleChange}
        />
        <button type="submit">Fetch numbers</button>
      </form>
      {data.windowCurrState.length > 0 && (
        <div>
          <h2>Results</h2>
          <p>Previous Window State: {data.windowPrevState.join(', ')}</p>
          <p>Current Window State: {data.windowCurrState.join(', ')}</p>
          <p>Numbers Received: {data.numbers.join(', ')}</p>
          <p>Average: {data.avg !== null ? data.avg.toFixed(2) : 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
