import React from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';

interface DraggableBlockProps {
  id: number;
  text: string;
  index: number;
  color: string
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ id, text, color, index, moveBlock }) => {
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

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={(node) => drag(drop(node))} style={{
      opacity, 
      backgroundColor: color, 
      width: "300px", 
      padding: 10, 
      marginTop: 5, 
      border: '1px solid #ccc',
      borderRadius: '4px',
      margin: '4px',
      textAlign: 'center',
      color: '#f1c40f'
    }}>
      {text}
    </div>
  );
};

export default DraggableBlock;
