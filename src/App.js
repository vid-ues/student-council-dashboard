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
  groupHeader: {
    backgroundColor: '#4a4a4a',
    color: 'white',
    padding: '10px',
    marginTop: '20px',
    marginBottom: '10px',
    borderRadius: '5px',
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
  const [questionGroups, setQuestionGroups] = useState({});
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

        const groups = {
          "General Questions Set 1": headers.slice(0, 7),
          "Student Body President": headers.slice(10, 13),
          "Student Body Vice President": headers.slice(13, 16),
          "Student Body Secretary": headers.slice(16, 19),
          "Student Body Treasurer": headers.slice(19, 22),
          "Student Body Speaker": headers.slice(22, 25),
          "General Questions Set 2": headers.slice(25)
        };

        const responseData = {};

        // Store all questions and their responses
        headers.forEach((question, index) => {
          const responsesForQuestion = rows
            .map(row => row[index] || '')  // Handle empty responses as blank
            .filter(response => response !== ''); // Filter out blank responses

          // Store the responses even if empty, to display the question
          responseData[question] = responsesForQuestion;
        });

        setQuestionGroups({ groups, responses: responseData });
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
      {Object.entries(questionGroups.groups || {}).map(([groupName, questions]) => (
        <div key={groupName}>
          <h2 style={styles.groupHeader}>{groupName}</h2>
          {questions.map((question, index) => (
            <div key={index} style={styles.questionCard}>
              <div
                style={styles.questionHeader}
                onClick={() => toggleExpand(question)}
              >
                <h3 style={styles.questionTitle}>{question}</h3>
                <span>{expandedQuestion === question ? '▲' : '▼'}</span>
              </div>
              {expandedQuestion === question && questionGroups.responses && (
                <div style={styles.responsesDetails}>
                  {questionGroups.responses[question].length > 0 ? (
                    questionGroups.responses[question].map((response, respIndex) => (
                      <div key={respIndex} style={styles.responseItem}>
                        <p>Response {respIndex + 1}: {response}</p>
                      </div>
                    ))
                  ) : (
                    <p>No responses available for this question.</p> // Optional message if there are no responses
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
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
