import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

function Recently() {
  const [Data, setData] = useState();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const getBooks = async () => {
      const response = await axios.get(`${apiUrl}/api/v1/get-recent-books`);
      setData(response.data.data);
    };

    getBooks();
  }, []);

  return (
    <>
      <div className="bg-zinc-900 py-12 text-white text-3xl">
        <h1 className="text-zinc-300 font-serif mx-12 mb-8 border-b-2 pb-2 text-4xl">Recently Added Books</h1>
        {!Data && (
          <div className="flex justify-center items-center text-5xl h-48">
            <Loader />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-12">
          {Data &&
            Data.map((items, i) => (
              <div key={i}>
                <div className="relative group transform transition duration-500 hover:scale-105">
                  <BookCard data={items} />
                  {/* <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg">
                    View Details
                  </div> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Recently;
