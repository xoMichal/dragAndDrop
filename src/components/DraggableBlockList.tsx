import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableBlock from './DraggableBlock';
import '../styles.css';
import { generateRandomColor } from '../function';
import { COLORS, defaultBlocks } from '../constants';

interface Block {
  id: number;
  text: string;
  color: string;
}

const DraggableBlockList: React.FC = () => {
  
  const [randomColor, setRandomColor] = useState(true);
  const [blocks, setBlocks] = useState<Block[]>(defaultBlocks);

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    const draggedBlock = blocks[dragIndex];
    const updatedBlocks = [...blocks];

    updatedBlocks.splice(dragIndex, 1);
    updatedBlocks.splice(hoverIndex, 0, draggedBlock);
    setBlocks(updatedBlocks);
  };

  const addBlock = () => {
    if (blocks.length >= 6) {
      alert('Możesz dodać maksymalnie 6 bloków!');
      return;
    }

    const newBlockId = blocks.length + 1;
    const newBlock = {
      id: newBlockId,
      text: `Block ${newBlockId}`,
      color: randomColor ? COLORS.black : generateRandomColor(),
    };

    setBlocks([...blocks, newBlock]);
  };

  const toggleRandomColor = () => {
    setRandomColor(!randomColor);
  };

  const resetBlocks = () => {
    setBlocks(defaultBlocks);
    setRandomColor(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='row'>
        <button onClick={addBlock}>Dodaj blok</button>
        <button
          style={{ backgroundColor: `${!randomColor ? COLORS.gold : COLORS.buttonColor}` }}
          onClick={toggleRandomColor}>
          Chce kolorów
        </button>
        <button onClick={resetBlocks}>Reset</button>
      </div>
      <div>
        {blocks.map((block, index) => (
          <DraggableBlock
            key={block.id}
            id={block.id}
            text={block.text}
            color={block.color}
            index={index}
            moveBlock={moveBlock}
            isFirst={index === 0}
            isLast={index === blocks.length - 1}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableBlockList;
