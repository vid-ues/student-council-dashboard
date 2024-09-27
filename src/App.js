import React, { useState, useEffect } from 'react';
import './App.css';

const LongFormResponseDisplay = () => {
  const [responses, setResponses] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const SHEET_ID = '1b6PKIXGqHTFEsU3wiObNe7cSfzNvQMLmGNqiGtBBB5c';
    const API_KEY = 'AIzaSyBSm0APazfjqdqSvpiMQA63NUviz3Qz0FU';
    const SHEET_NAME = 'Form Responses 1';
    const range = `${SHEET_NAME}!F:AG`;

    const script = document.createElement('script');
    script.src = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}&callback=onDataLoaded`;
    document.body.appendChild(script);

    window.onDataLoaded = (response) => {
      if (response.error) {
        setError(`API Error: ${response.error.message}`);
        return;
      }
      if (!response.values || response.values.length < 2) {
        setError('No data found or insufficient data');
        return;
      }
      const [headers, ...rows] = response.values;
      const formattedResponses = rows.map(row => {
        return headers.reduce((acc, header, index) => {
          acc[header] = row[index] || 'No response';
          return acc;
        }, {});
      });
      setResponses(formattedResponses);
    };

    return () => {
      delete window.onDataLoaded;
      document.body.removeChild(script);
    };
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="responses-container">
      {responses.length === 0 ? (
        <div>Loading...</div>
      ) : (
        responses.map((response, index) => (
          <div key={index} className="response-card">
            <div 
              className="response-header"
              onClick={() => toggleExpand(index)}
            >
              <h3>Response {index + 1}</h3>
              <span>{expandedIndex === index ? '▲' : '▼'}</span>
            </div>
            {expandedIndex === index && (
              <div className="response-details">
                {Object.entries(response).map(([question, answer], qIndex) => (
                  <div key={qIndex} className="qa-pair">
                    <p className="question">{question}</p>
                    <p className="answer">{answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Council Survey Responses</h1>
      </header>
      <main>
        <LongFormResponseDisplay />
      </main>
    </div>
  );
}

export default App;