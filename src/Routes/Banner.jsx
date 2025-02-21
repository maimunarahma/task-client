const Banner = () => {
    return (
        <div 
            className="mt-8 flex flex-col md:flex-row justify-between items-center max-w-full h-screen bg-cover bg-center" 
            style={{ backgroundImage: "url('https://i.ibb.co/hJ7G3BhF/task-management-concept-banner-header-vector-24529046.jpg')" }}
        >
          <div className="m-16 bg-blackrounded-lg md:w-1/2  w-full md:p-8">
            <h1 className="text-4xl font-bold mb-4">
              Task Management
            </h1>
            <p className="text-lg mb-8">
              Organize and manage your team like a boss with Bitrix24, task management software packing more capabilities than you can imagine.
            </p>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">Get Started</button>
          </div>
          <div className="w-1/2 flex justify-center">
            
          </div>
        </div>
    );
};

export default Banner;
