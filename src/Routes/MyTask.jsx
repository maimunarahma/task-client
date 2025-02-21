import { useContext, useEffect, useState } from "react";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const MyTask = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const [tasks, setTasks] = useState([]);
  const [click, setClick] = useState(false); // Corrected state initialization

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
            // alert(`task moved to ${overTask.category}`);
            Swal.fire({
              title: `task moved to ${overTask.category}`,
              icon: "success",
              draggable: true
            });
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
    console.log(id);
    console.log("Deleting task with id:", id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/task/${id}`)
          .then((res) => {
            console.log(res.data);

            // Remove the deleted task from the state
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

            // Success alert
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.error("Error deleting task:", err);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the task.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleSubmitUpdate = (e, taskId) => {
    e.preventDefault();
    const name = e.target.title.value;
    const description = e.target.description.value;
    const deadline = e.target.deadline.value;
    const category = e.target.category.value;
    const task = { title: name, description: description, deadline: deadline, category: category };

    axios
      .put(`http://localhost:5000/task/${taskId}`, task)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setTasks((prevTasks) =>
            prevTasks.map((Task) =>
              Task._id === taskId ? { ...Task, ...task } : Task
            )
          );
          Swal.fire("Updated!", "Your task has been updated.", "success");
          setClick(false); // Hide the modal
        }
      })
      .catch((err) => {
        Swal.fire("Error!", "There was an issue updating the task.", "error");
        setClick(false); // Hide the modal
      });
  };

  const sensor=useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor,{   coordinateGetter:sortableKeyboardCoordinates})
  )
  return (
    <div className="md:mt-24 mt-6 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
      {/* Left Column for Task List */}
      <div className="flex flex-col w-full md:w-1/2" >
        <h1 className="text-3xl font-semibold mb-4">All Tasks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">

        {tasks.map((task) => (
          <div key={task._id} className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">{task.deadline}</p>
            <p className="text-sm text-gray-600">{task.category}</p>
           
            <button className="btn mt-2" onClick={() => handleDelete(task._id)}>
              Delete
            </button>
{/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById(`modal_${task._id}`).showModal()}>Update</button>
<dialog id={`modal_${task._id}`} className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Update Now!</h3>
 
    <div className="modal-action">
    <form onSubmit={(e) => handleSubmitUpdate(e, task._id)} className="">
                    <label className="block mb-2">Title</label>
                    <input type="text" name="title" className="input input-bordered w-full mb-4" defaultValue={task.title} />
                    <label className="block mb-2">Description</label>
                    <textarea name="description" className="input input-bordered w-full mb-4" defaultValue={task.description} />
                    <label className="block mb-2">Deadline</label>
                    <input type="text" name="deadline" className="input input-bordered w-full mb-4" defaultValue={task.deadline} />
                    <label className="block mb-2">Category</label>
                    <input type="text" name="category" className="input input-bordered w-full mb-4" defaultValue={task.category} />
                    <div className="modal-action">
                      <button type="submit" className="btn" onClick={() => document.getElementById(`modal_${task._id}`).close()}>Update Task</button>
                      <button type="button" className="btn" onClick={() => document.getElementById(`modal_${task._id}`).close()}>
                        Close
                      </button>
                    </div>
                  </form>
    </div>
  </div>
</dialog>
           
          </div>
        ))}
        </div>
      
      </div>

      {/* Right Column for Drag-and-Drop Task Columns */}
      <div className="w-full md:w-1/2 h-full">
      <h1 className="text-5xl font-bold">Drag And Drop </h1>
        <DndContext collisionDetection={closestCorners} sensors={sensor} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(categorizedTasks).map((category) => (
              <div key={category} className="task-column p-4 border rounded-md shadow-md">
                <h2 className="text-center text-xl font-semibold mb-4">{category}</h2>
                <SortableContext items={categorizedTasks[category].map((task) => task._id)} strategy={verticalListSortingStrategy}>
                  {categorizedTasks[category].map((task) => (
                    <Task key={task._id} id={task._id} title={task.title} category={task.category} />
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
