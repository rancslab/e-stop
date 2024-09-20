import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [statusMessage, setStatusMessage] = useState('Idle');
  const [intervalId, setIntervalId] = useState(null); // Store interval ID
  const [isSending, setIsSending] = useState(false); // Track if signals are being sent

  const sendStopSignal = async () => {
    try {
      const response = await fetch('http://localhost:3001/send-stop-signal', {
        method: 'POST',
      });

      console.log('Response status:', response.status); // Log the response status

      if (response.ok) {
        setStatusMessage('Sending signals to RSU');
      } else {
        setStatusMessage('Failed to send signal');
      }
    } catch (error) {
      console.error('Error: ', error);
      setStatusMessage('Error sending STOP signal');
    }
  };

  const handleStopClick = () => {
    if (!isSending) {
      // If not currently sending, start sending signals every 50ms
      const newIntervalId = setInterval(sendStopSignal, 50);
      setIntervalId(newIntervalId);
      setIsSending(true);
      setStatusMessage('Sending stop signals every 50ms');
    } else {
      // If already sending, stop sending signals
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
        setIsSending(false);
        setStatusMessage('Stopped sending stop signals');
      }
    }
  };

  // Cleanup interval when component unmounts or page refreshes
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log('Stopped sending stop signals');
      }
    };
  }, [intervalId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-12 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8">Emergency Stop</h1>
        <button
          className={`${
            isSending ? 'bg-green-600' : 'bg-red-600'
          } text-white py-4 px-8 rounded-2xl hover:bg-red-800 transition duration-300`}
          type="button"
          onClick={handleStopClick}
        >
          {isSending ? 'Stop Sending Signal' : 'Send Signal'}
        </button>

        <div className="mt-8 text-2xl font-semibold">{statusMessage}</div>
      </div>
    </div>
  );
}

export default App;