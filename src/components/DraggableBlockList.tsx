import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableBlock from './DraggableBlock';


interface Block {
  id: number;
  text: string;
  color: string
}

const DraggableBlockList: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 1, text: 'Block 1', color:'blue' },
    { id: 2, text: 'Block 2', color:'red' },
    { id: 3, text: 'Block 3', color:'yellow' },
    // ...more blocks
  ]);

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    const draggedBlock = blocks[dragIndex];

    // Tworzymy nową tablicę bloków
    const updatedBlocks = [...blocks];

    // Usuwamy przeciągany blok ze starej pozycji
    updatedBlocks.splice(dragIndex, 1);

    // Wstawiamy przeciągany blok na nową pozycję
    updatedBlocks.splice(hoverIndex, 0, draggedBlock);

    // Aktualizujemy stan z nową kolejnością bloków
    setBlocks(updatedBlocks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {blocks.map((block, index) => (
          <DraggableBlock
            key={block.id}
            id={block.id}
            text={block.text}
            // color={block.color}
            index={index}
            moveBlock={moveBlock}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableBlockList;
