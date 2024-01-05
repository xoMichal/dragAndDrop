import React from 'react';
import DraggableBlockList from './components/DraggableBlockList';


const App: React.FC = () => {
  return (
    <div>
      <h1>Przeciągnij i Upuść Bloki</h1>
      <DraggableBlockList />
    </div>
  );
};

export default App;
