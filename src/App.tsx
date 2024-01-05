import React from 'react';
import DraggableBlockList from './components/DraggableBlockList';


const App: React.FC = () => {
  return (
    <div className='container'>
      <h1>Zmień kolejność!</h1>
      <DraggableBlockList />
    </div>
  );
};

export default App;
