import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // Biblioteca para parsear CSV (instale usando npm install papaparse)

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTnIAOaFLwYpDrEX9KZVoZdoTeBh5TyA7TJ0fphqchQ0Ntg0JRVUa1hV94tTBDrDRKvUYTmqUMpnld7/pub?output=csv'; // Substitua pelo link gerado

const App = () => {
  const [data, setData] = useState([]);
  const [datalogin, setDataLogin] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(SHEET_CSV_URL);
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // Parse CSV
      setData(results.data);
      console.log(data);
      console.log(toString(data.row.login));
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  };

  return (
    <div>
      <h1>Google Sheets Data</h1>
      <table>
        <thead>
          <tr>
            <th>Login</th>
            <th>Password</th>
            <th>Connection State</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              
              <td>{row.login}</td>
              
              <td>{row.password}</td>
              <td>{row.connectionState}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;