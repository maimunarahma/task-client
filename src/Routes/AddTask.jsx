import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to='/' />;
    }
    const handleTask=e=>{
        e.preventDefault();

        const title=e.target.title.value;
        const description=e.target.description.value;
        const deadline=e.target.deadline.value;
   const category= e.target.category.value;
   const task={ title:title, description:description, email: user.email, deadline:deadline, category: category};
   
  axios.post('http://localhost:5000/task',task)
  .then(res=>{
    console.log(res.data)
    if(res.data.insertedId){
        alert('task added')
    }
  } )
    }

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-16">
        <div className="w-full md:w-1/2  mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg mt-24">
            <h2 className="text-3xl font-bold text-center mb-6">Add New Task</h2>
            <form onSubmit={handleTask} className="space-y-4">
                
                {/* Task Title */}
                <div>
                    <label className="block text-lg font-semibold mb-1">Task Title</label>
                    <input
                        type="text"
                        name="title"
                       required
                        placeholder="Enter task title"
                   
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Task Description */}
                <div>
                    <label className="block text-lg font-semibold mb-1">Description</label>
                    <textarea
                        name="description"
                       
                        placeholder="Enter task description"
                        rows="3"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Task Deadline */}
                <div>
                    <label className="block text-lg font-semibold mb-1">Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                    
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Priority Dropdown */}
                <div>
                    <label className="block text-lg font-semibold mb-1">Priority</label>
                    <select
                        name="category"
                       
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="todo">To-do</option>
                        <option value="inprogress">In progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                    Add Task
                </button>
            </form>
        </div>
        <div className="w-full md:w-1/2">
            <img src="https://i.ibb.co.com/Z6wnNMLP/4663532-6725.jpg" alt="" />
        </div>
        </div>
    );
};

export default AddTask;
