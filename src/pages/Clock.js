// Clock.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button
} from '@mui/material';

function Clock({ unixTimestamp }) {
  const [currentTime, setCurrentTime] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(unixTimestamp !== null);

  useEffect(() => {
    if (isTimerRunning) {
      const timer = setInterval(() => {
        // Create a Date object from the Unix timestamp (in milliseconds)
        const date = new Date(unixTimestamp * 1000);

        // Format the time as a digital clock (HH:MM:SS)
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');

        const formattedTime = `${hours}:${minutes}:${seconds}`;

        setCurrentTime(formattedTime);

        // Update the Unix timestamp by 1 second
        unixTimestamp += 1;
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [unixTimestamp, isTimerRunning]);

  const handleStartPauseClick = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  return (
    <Box style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
      <Box style={{ background: '#000', color: 'white', fontWeight: 700, padding: '10px 20px', textAlign: 'center' }}>
        <Typography>Current Time</Typography>
        <Typography>{currentTime}</Typography>
      </Box>
      <Button onClick={handleStartPauseClick} style={{ backgroundColor: '#c2e5c2', padding: '0px 20px', color: '#043927', fontWeight: 600 }}>
        {isTimerRunning ? 'Pause' : 'Start'}
      </Button>
    </Box>
  );
}

export default Clock;
