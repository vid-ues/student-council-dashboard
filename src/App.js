useEffect(() => {
  console.log("useEffect is running..."); // This will help us check if useEffect is firing
  
  const SHEET_ID = '1b6PKIXGqHTFEsU3wiObNe7cSfzNvQMLmGNqiGtBBB5c';
  const API_KEY = 'AIzaSyBSm0APazfjqdqSvpiMQA63NUviz3Qz0FU';
  const SHEET_NAME = 'Form Responses 1';
  const range = `${SHEET_NAME}!F:AG`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

  fetch(url)
    .then(response => {
      console.log("Fetch successful:", response);  // Log fetch success
      return response.json();
    })
    .then(data => {
      console.log("Fetched Data:", data);  // Log the fetched data
    })
    .catch(error => {
      console.error("Error fetching data:", error); // Log if there’s an error
    });
}, []);
