import React, { useState, useEffect } from 'react';
import { google } from 'googleapis';

const CLIENT_ID = 'YOUR_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';
const SHEET_ID = 'YOUR_SHEET_ID';
const RANGE = 'Sheet1!A:C'; // Ajuste o range conforme suas colunas

const App = () => {
  const [data, setData] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [connectionState, setConnectionState] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const sheets = google.sheets({ version: 'v4', auth: API_KEY });
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE,
      });
      setData(response.data.values || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (rowIndex) => {
    setEditRow(rowIndex);
    const row = data[rowIndex];
    setLogin(row[0]);
    setPassword(row[1]);
    setConnectionState(row[2]);
  };

  const handleSave = async () => {
    const sheets = google.sheets({ version: 'v4', auth: API_KEY });
    try {
      const updateRange = Sheet1!A${editRow + 1}:C${editRow + 1};
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: updateRange,
        valueInputOption: 'RAW',
        resource: {
          values: [[login, password, connectionState]],
        },
      });
      setEditRow(null);
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {editRow === index ? (
                <>
                  <td><input value={login} onChange={(e) => setLogin(e.target.value)} /></td>
                  <td><input value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                  <td><input value={connectionState} onChange={(e) => setConnectionState(e.target.value)} /></td>
                  <td><button onClick={handleSave}>Save</button></td>
                </>
              ) : (
                <>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td><button onClick={() => handleEdit(index)}>Edit</button></td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;