import React, { useState } from 'react';
import {
  useDrag,
  useDrop,
  DragSourceMonitor,
} from 'react-dnd';
import { BLOCK } from '../function';

interface DraggableBlockProps {
  id: number;
  text: string;
  index: number;
  color: string;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  isFirst: boolean;
  isLast: boolean;
}
const DraggableBlock: React.FC<DraggableBlockProps> = ({
  id,
  text,
  color,
  index,
  isFirst,
  isLast,
  moveBlock,
}) => {
  const [isMoving, setIsMoving] = useState(false);

  const [{ isDragging }, drag, dragRef] = useDrag({
    type: 'block',
    item: { id, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'block',
    hover(item: { id: number; index: number }) {
      if (!dragRef) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveBlock(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  
  const moveUp = () => {
    setIsMoving(true);
    moveBlock(index, index - 1);
    setTimeout(() => {
      setIsMoving(false);
    }, 200); 
  };

  const moveDown = () => {
    setIsMoving(true);
    moveBlock(index, index + 1);
    setTimeout(() => {
      setIsMoving(false);
    }, 200);
  };

  const opacity = isDragging ? 0.5 : 1;
  const blockStyles = BLOCK(opacity,isMoving,color)

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={blockStyles}>
      <div style={{ display: 'flex',flexDirection: 'row',}}>
        <div style={{ display: 'flex', flexGrow: 1, alignItems:'center', justifyContent:'center'}}>{text}</div>
        <div
          style={{
            display: 'flex',flexDirection: 'column',gap:8,flexShrink:1
          }}>
          {!isFirst && (
            <button className='move-button' onClick={moveUp}>
              W górę
            </button>
          )}
          {!isLast && (
            <button className='move-button' onClick={moveDown}>
              W dół
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraggableBlock;



