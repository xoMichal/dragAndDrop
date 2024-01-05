import React from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';

interface DraggableBlockProps {
  id: number;
  text: string;
  index: number;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ id, text, index, moveBlock }) => {
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
    <div ref={(node) => drag(drop(node))} style={{ opacity }}>
      {text}
    </div>
  );
};

export default DraggableBlock;
