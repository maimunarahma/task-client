const Banner = () => {
    return (
        <div 
            className="mt-8 flex justify-between items-center w-full h-screen bg-cover bg-center" 
            style={{ backgroundImage: "url('https://i.ibb.co/hJ7G3BhF/task-management-concept-banner-header-vector-24529046.jpg')" }}
        >
          <div className="m-16 bg-black bg-opacity-50 rounded-lg w-1/2 p-8">
            <h1 className="text-4xl font-bold mb-4">
              Task Management
            </h1>
            <p className="text-lg mb-8">
              Organize and manage your team like a boss with Bitrix24, task management software packing more capabilities than you can imagine.
            </p>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">Get Started</button>
          </div>
          <div className="w-1/2 flex justify-center">
            <img 
              className="w-full h-full object-cover rounded-lg"
              src="https://i.ibb.co/cS6qDrVd/15-Project-Management-Challenges-and-How-To-Solve-Them.webp" 
              alt="Task Management"
            />
          </div>
        </div>
    );
};

export default Banner;
