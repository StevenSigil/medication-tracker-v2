import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
    function handleSubmit() {
        axios
            .post('http://127.0.0.1:8000/api/users/login', {email: 's@example.com', password: '1234'}, {with_credentials: true})
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
  return (
    <div className="App">
      <h1> You are live! </h1>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
