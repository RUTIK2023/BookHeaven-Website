import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

function AddBook() {

    const [book, setBook] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/api/v1/add-book`, book, { headers });

            setBook({
                url: "",
                title: "",
                author: "",
                price: "",
                desc: "",
                language: "",
            });

            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error("Failed to add book. Please try again.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto p-6 bg-zinc-800 text-white rounded-lg shadow-lg"
        >
            <h1 className="text-3xl font-bold mb-6 text-center">Add a New Book</h1>
            <form onSubmit={submitHandler} className="space-y-6">
                
                {/* URL */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.4 }}
                    className="flex space-x-4"
                >
                    <div className="w-1/2">
                        <label className="block text-sm font-medium mb-2" htmlFor="url">Image URL</label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            value={book.url}
                            onChange={changeHandler}
                            className="w-full px-4 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-600 transition"
                            placeholder="Enter image URL"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-medium mb-2" htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={book.title}
                            onChange={changeHandler}
                            className="w-full px-4 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-600 transition"
                            placeholder="Enter book title"
                            required
                        />
                    </div>
                </motion.div>

                {/* Author */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.5 }}
                >
                    <label className="block text-sm font-medium mb-2" htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={book.author}
                        onChange={changeHandler}
                        className="w-full px-4 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-600 transition"
                        placeholder="Enter author's name"
                        required
                    />
                </motion.div>

                {/* Description */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.6 }}
                >
                    <label className="block text-sm font-medium mb-2" htmlFor="desc">Description</label>
                    <textarea
                        id="desc"
                        name="desc"
                        value={book.desc}
                        onChange={changeHandler}
                        className="w-full px-4 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-600 transition"
                        placeholder="Enter book description"
                        rows="4"
                        required
                    />
                </motion.div>

                {/* Language and Price in the same row */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.7 }}
                    className="flex space-x-4"
                >
                    <div className="w-1/2">
                        <label className="block text-sm font-medium mb-2" htmlFor="language">Language</label>
                        <input
                            type="text"
                            id="language"
                            name="language"
                            value={book.language}
                            onChange={changeHandler}
                            className="w-full px-4 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-600 transition"
                            placeholder="Enter language"
                            required
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-sm font-medium mb-2" htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={book.price}
                            onChange={changeHandler}
                            className="w-full px-4 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-600 transition"
                            placeholder="Enter price"
                            required
                        />
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.8 }}
                >
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded transition">
                        Add Book
                    </button>
                </motion.div>
            </form>
        </motion.div>
    );
}

export default AddBook;
