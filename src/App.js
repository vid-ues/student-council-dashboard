useEffect(() => {
  const SHEET_ID = '1b6PKIXGqHTFEsU3wiObNe7cSfzNvQMLmGNqiGtBBB5c';
  const API_KEY = 'AIzaSyBSm0APazfjqdqSvpiMQA63NUviz3Qz0FU';
  const SHEET_NAME = 'Form Responses 1';
  const range = `${SHEET_NAME}!F:AG`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Fetched Data:', data);  // Add this to log the fetched data
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

      // Debugging the row mapping
      headers.forEach((question, index) => {
        const validResponses = rows.map(row => row[index] || 'No response')
                                    .filter(response => response !== 'No response');
        console.log(`Question: ${question}, Valid Responses:`, validResponses); // Add this to log valid responses

        // Only include questions that have valid responses
        if (validResponses.length > 0) {
          responseData[question] = validResponses;
        }
      });

      console.log('Final Filtered Data:', responseData); // Add this to log the final processed data
      setQuestionGroups({ groups, responses: responseData });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError(`Fetch error: ${error.message}`);
    });
}, []);
