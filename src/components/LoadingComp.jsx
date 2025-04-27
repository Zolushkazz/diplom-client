import { CircularProgress, Box } from '@mui/material';
import { useState, useEffect } from 'react';

const LoadingComponent = ({ timeInterval = 3000 }) => {  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, timeInterval);

    
    return () => clearTimeout(timer);
  }, [timeInterval]);

  if (!isLoading) return null;  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingComponent;
