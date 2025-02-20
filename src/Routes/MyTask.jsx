import { useContext, useEffect, useState } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const MyTask = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/task/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  const getTaskPos = (id) => tasks.findIndex((task) => task._id === id);

  // Handle the task drag and category change
  const handleDragEnd = (e) => {
    const { active, over } = e;

    // If dropped outside or the task remains in the same position
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((task) => task._id === active.id);
    const overTask = tasks.find((task) => task._id === over.id);

    // If the task moves to a different category
    if (activeTask.category !== overTask.category) {
      // Update task's category in the state and backend
      setTasks((tasks) =>
        tasks.map((task) =>
          task._id === active.id ? { ...task, category: overTask.category } : task
        )
      );

      // Make an API request to update the task's category in the backend
      axios
        .put(`http://localhost:5000/task/${active.id}`, {
          category: overTask.category,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            alert(`task moved to ${overTask.category}`);
          }
        })
        .catch((err) => console.error(err));
    } else {
      // If task remains in the same category, reorder tasks
      setTasks((tasks) => {
        const remainPosition = getTaskPos(active.id);
        const newP = getTaskPos(over.id);
        return arrayMove(tasks, remainPosition, newP);
      });
    }
  };

  // Categorize tasks for different columns
  const categorizedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {});
  const handleDelete = (id) => {
   console.log(id)
    console.log('Deleting task with id:', id);

    axios
      .delete(`http://localhost:5000/task/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error('Error deleting task:', err));
  };
  return (
    <div className="mt-16 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
      {/* Left Column for Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-1/2 gap-4">
        <h1 className="text-3xl font-semibold mb-4">All Tasks</h1>
        {tasks.map((task) => (
          <div key={task._id} className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">{task.deadline}</p>
            <p className="text-sm text-gray-600">{task.category}</p>
            <button
        className="btn mt-2"
        onClick={() => handleDelete(task._id)}
        
      >
        Delete
      </button>
          </div>
        ))}
      </div>

      {/* Right Column for Drag-and-Drop Task Columns */}
      <div className="w-full md:w-1/2 h-full">
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(categorizedTasks).map((category) => (
              <div key={category} className="task-column p-4 border rounded-md shadow-md">
                <h2 className="text-center text-xl font-semibold mb-4">{category}</h2>
                <SortableContext
                  items={categorizedTasks[category].map((task) => task._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {categorizedTasks[category].map((task) => (
                    <Task
                      key={task._id}
                      id={task._id}
                      title={task.title}
                      category={task.category}
                    />
                  ))}
                </SortableContext>
              </div>
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default MyTask;
