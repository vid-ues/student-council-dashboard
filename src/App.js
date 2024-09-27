import React, { useState, useEffect } from 'react';
import './App.css';

const QuestionResponseDisplay = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const SHEET_ID = '1b6PKIXGqHTFEsU3wiObNe7cSfzNvQMLmGNqiGtBBB5c';
    const API_KEY = 'AIzaSyBSm0APazfjqdqSvpiMQA63NUviz3Qz0FU';
    const SHEET_NAME = 'Form Responses 1';
    const range = `${SHEET_NAME}!F:AG`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(`API Error: ${data.error.message}`);
          return;
        }
        if (!data.values || data.values.length < 2) {
          setError('No data found or insufficient data');
          return;
        }
        const [headers, ...rows] = data.values;
        setQuestions(headers);

        const responseData = {};
        headers.forEach((question, index) => {
          responseData[question] = rows.map(row => row[index] || 'No response');
        });
        setResponses(responseData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(`Fetch error: ${error.message}`);
      });
  }, []);

  const toggleExpand = (question) => {
    setExpandedQuestion(expandedQuestion === question ? null : question);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="questions-container">
      {questions.length === 0 ? (
        <div>Loading...</div>
      ) : (
        questions.map((question, index) => (
          <div key={index} className="question-card">
            <div 
              className="question-header"
              onClick={() => toggleExpand(question)}
            >
              <h3>{question}</h3>
              <span>{expandedQuestion === question ? '▲' : '▼'}</span>
            </div>
            {expandedQuestion === question && (
              <div className="responses-details">
                {responses[question].map((response, respIndex) => (
                  <div key={respIndex} className="response-item">
                    <p>Response {respIndex + 1}: {response}</p>
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
        <h1>Student Council Survey Questions</h1>
      </header>
      <main>
        <QuestionResponseDisplay />
      </main>
    </div>
  );
}

export default App;