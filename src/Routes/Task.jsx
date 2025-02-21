import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Task = ({ id, title, category }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const [isDragging, setIsDragging] = useState(false);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1, // Visual feedback for dragging
    pointerEvents: isDragging ? 'none' : 'auto', // Disable interaction during drag
    touchAction:"none",
  };

 

  const handleDragStart = () => setIsDragging(true);  // Set dragging state on drag start
  const handleDragEnd = () => setIsDragging(false);   // Reset dragging state on drag end

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="border-2 p-4 m-2 rounded-md"
      onDragStart={handleDragStart}  // Track when drag starts
      onDragEnd={handleDragEnd}      // Track when drag ends
      
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>{category}</p>
     
    </div>
  );
};

export default Task;
