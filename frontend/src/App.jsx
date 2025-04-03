import React from 'react';
import HistoryPage from './HistoryPage';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const userEmail = 'user@example.com'; 
  
  return (
    <ErrorBoundary>
      <HistoryPage userEmail={userEmail} />
    </ErrorBoundary>
  );
};

export default App;
