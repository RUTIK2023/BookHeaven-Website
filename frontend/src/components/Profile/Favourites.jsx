import React, { useState, useEffect } from "react";
import BookCard from "../BookCard/BookCard";
import axios from "axios";
import EmptyCard from "./EmptyCard"; // Ensure you have an EmptyCard component

function Favourites() {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    
    // Initialize favBooks as an empty array
    const [favBooks, setFavBooks] = useState([]);

    useEffect(() => {
        const getBook = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;

            try {
                const response = await axios.get(`${apiUrl}/api/v1/get-favourites-books`, { headers });

                // Check if response.data.data is an array
                if (Array.isArray(response.data.data)) {
                    setFavBooks(response.data.data); // Set data if it's an array
                } else {
                    console.warn("Expected an array but got:", response.data.data);
                    setFavBooks([]); // Set to empty array if not an array
                }
            } catch (error) {
                console.error("Error fetching favorite books:", error);
                setFavBooks([]); // Set to empty array on error
            }
        };
        getBook();
    }, [favBooks]); // No dependencies, runs once on mount

    return (
        <div className="p-6 lg:p-0 grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            {favBooks.length === 0 ? (
                <div className=" flex items-center justify-center"><EmptyCard /></div> // Show empty card if no favorites
            ) : (
                favBooks.map((item, i) => (
                    <div key={i}>
                        <BookCard data={item} favourite={true} />
                    </div>
                ))
            )}
        </div>
    );
}

export default Favourites;
