import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function BookCard({ data, favourite }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveFav = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const response = await axios.put(`${apiUrl}/api/v1/remove-book-from-favourites`, {}, { headers });
    toast.error(response.data.message);
  };

  return (
    <>
      <NavLink to={`/view-book-details/${data._id}`}>
        <div className="relative rounded-lg my-6 p-4 bg-zinc-800 flex flex-col h-[350px] transition-transform transform hover:scale-105 shadow-lg">
          <div className="h-[200px] bg-zinc-700 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 group">
            <img
              src={data.url}
              alt={data.title}
              className="h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
            />
          </div>
          <h2 className="mt-4 text-2xl text-zinc-100 font-serif font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-200 text-xl">- by {data.author}</p>
          <p className="mt-2 text-blue-400 text-xl">₹ {data.price}</p>
        </div>
      </NavLink>
      {favourite && (
        <button
          onClick={handleRemoveFav}
          className="w-full p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
        >
          Remove from Favourites
        </button>
      )}
    </>
  );
}

export default BookCard;
