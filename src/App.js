import React from 'react';
import './App.css';

function App() {
  const [statusMessage, setStatusMessage] = React.useState('Idle');

  const handleStopClick = async () => {
    try {
      const response = await fetch('http://localhost:3001/send-stop-signal',{
        method: 'POST',
      });

      if (!response.ok){
        setStatusMessage('Failed to send stop signal');
      }

      setStatusMessage('Stop signal sent to RSU');
      
    } catch (error) {
      setStatusMessage('Error sending STOP signal');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Emergency Stop</h1>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-800 transition duration-300"
          type="button"
          onClick={handleStopClick}
        >
          Send Stop Signal 
        </button>

        <div className="mt-6 text-4xl font-semibold">{statusMessage}</div>

      </div>
    </div>
  );
}

export default App;
