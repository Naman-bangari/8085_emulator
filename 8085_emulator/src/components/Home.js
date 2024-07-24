import React, { useState } from 'react';
import './Home.css';
import Process from './Process'; 

export default function Home() {
  const [code, setCode] = useState('');
  const [additionalText, setAdditionalText] = useState('');
  const [runKey, setRunKey] = useState(0); 

  const handleRun = () => {
    setRunKey(prevKey => prevKey + 1); 
  };

  const handleClear = () => {
    setCode('');
    setAdditionalText('');
    setRunKey(prevKey => prevKey + 1); 
  };

  return (
    <div className="home-container  my-2 ">
      <h2>8085 Microprocessor Code Editor</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your 8085 code here..."
        rows="10"
        cols="50"
        className="code-textarea"
      />
      <div className="buttons">
        <button onClick={handleClear} className="clear-button">Clear</button>
        <button onClick={handleRun} className="run-button">Run</button>
      </div>
      <br />
      <textarea
        value={additionalText}
        onChange={(e) => setAdditionalText(e.target.value)}
        placeholder="Pre-stored value here like address,value pair like 3000,10"
        rows="4"
        cols="50"
        className="codee"
      />
      <Process key={runKey} code={code} additionalText={additionalText} />
    </div>
  );
}
