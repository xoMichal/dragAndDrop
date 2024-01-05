import React, { useState } from 'react';
import {
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from 'react-dnd';

interface DraggableBlockProps {
  id: number;
  text: string;
  index: number;
  color: string;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  isFirst: boolean;
  isLast: boolean;
}
// TODO kick styles to css
const DraggableBlock: React.FC<DraggableBlockProps> = ({
  id,
  text,
  color,
  index,
  isFirst,
  isLast,
  moveBlock,
}) => {
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
  const [isMoving, setIsMoving] = useState(false);
  
  const moveUp = () => {
    setIsMoving(true);
    moveBlock(index, index - 1);
    setTimeout(() => {
      setIsMoving(false);
    }, 300); 
  };

  const moveDown = () => {
    setIsMoving(true);
    moveBlock(index, index + 1);
    setTimeout(() => {
      setIsMoving(false);
    }, 300);
  };

  const opacity = isDragging ? 0.5 : 1;
  
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity,
        backgroundColor: color,
        width: '300px',
        padding: 10,
        marginTop: 5,
        border: '1px solid #ccc',
        borderRadius: '4px',
        margin: '4px',
        textAlign: 'center',
        color: '#f1c40f',   
        transition: 'transform 0.3s ease', 
        transform: isMoving ? 'translateY(10px)' : 'none', 
      }}>
      <div style={{ display: 'flex',
            flexDirection: 'row',}}>
        <div style={{ display: 'flex',
            flexGrow: 1, alignItems:'center', justifyContent:'center'}}>{text}</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap:8,
            flexShrink:1
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
