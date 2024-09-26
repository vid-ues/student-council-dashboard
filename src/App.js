import React, { useState, useEffect } from 'react';

const LongFormResponseDisplay = () => {
  const [responses, setResponses] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const SHEET_ID = '1b6PKIXGqHTFEsU3wiObNe7cSfzNvQMLmGNqiGtBBB5c';
    const API_KEY = 'AIzaSyBSm0APazfjqdqSvpiMQA63NUviz3Qz0FU';
    const SHEET_NAME = 'Form Responses 1';
    const range = `${SHEET_NAME}!F1:AG`;

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const [headers, ...rows] = data.values;
        const formattedResponses = rows.map(row => {
          return headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
          }, {});
        });
        setResponses(formattedResponses);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {responses.map((response, index) => (
        <div key={index} className="border rounded-lg p-4 bg-white shadow">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleExpand(index)}
          >
            <h3 className="font-semibold text-lg">Response {index + 1}</h3>
            <span>{expandedIndex === index ? '▲' : '▼'}</span>
          </div>
          {expandedIndex === index && (
            <div className="mt-2 space-y-2">
              {Object.entries(response).map(([question, answer], qIndex) => (
                <div key={qIndex}>
                  <p className="font-medium">{question}</p>
                  <p className="text-gray-600">{answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Student Council Survey Responses</h1>
      <LongFormResponseDisplay />
    </div>
  );
}

export default App;
