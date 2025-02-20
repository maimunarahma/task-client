// import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

// import { SortableItem } from "@dnd-kit/sortable"; // Import SortableItem

const MyTask = () => {
    const data = useLoaderData(); // Fetching tasks
   
    return (
        <div className="flex flex-col md:flex-row gap-4 p-4">
            <div className="card bg-base-100 w-96 shadow-xl">
                {
                    data.map(d=>
                        <>
                        <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{d.title}</h2>
    <p>{d.description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div></>
                    )
                }

</div>
        </div>
    );
};

export default MyTask;
