import React, { useState, useEffect } from 'react';

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    backgroundColor: '#282c34',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
    marginBottom: '20px',
  },
  questionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  questionCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  questionHeader: {
    backgroundColor: '#f0f0f0',
    padding: '15px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionTitle: {
    margin: 0,
    fontSize: '18px',
  },
  responsesDetails: {
    padding: '15px',
  },
  responseItem: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '20px',
  },
};

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
    return <div style={styles.errorMessage}>{error}</div>;
  }

  return (
    <div style={styles.questionsContainer}>
      {questions.length === 0 ? (
        <div>Loading...</div>
      ) : (
        questions.map((question, index) => (
          <div key={index} style={styles.questionCard}>
            <div 
              style={styles.questionHeader}
              onClick={() => toggleExpand(question)}
            >
              <h3 style={styles.questionTitle}>{question}</h3>
              <span>{expandedQuestion === question ? '▲' : '▼'}</span>
            </div>
            {expandedQuestion === question && (
              <div style={styles.responsesDetails}>
                {responses[question].map((response, respIndex) => (
                  <div key={respIndex} style={styles.responseItem}>
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
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>Student Council Survey Questions</h1>
      </header>
      <main>
        <QuestionResponseDisplay />
      </main>
    </div>
  );
}

export default App;