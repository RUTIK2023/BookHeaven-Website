import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ViewBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const getBook = async () => {
            const response = await axios.get(`${apiUrl}/api/v1/get-book-by-id/${id}`);
            setBookData(response.data.data);
        };
        getBook();
    }, [id]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const handleFavourites = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.put(`${apiUrl}/api/v1/add-book-to-favourites`, {}, { headers });
        toast.success(response.data.message);
    };

    const handleCart = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.put(`${apiUrl}/api/v1/add-to-cart`, {}, { headers });
        toast.success(response.data.message);
    };

    const deleteBook = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.delete(`${apiUrl}/api/v1/delete-book`, { headers });
        toast.error(response.data.message);
        navigate('/allbooks');
    };

    return (
        <>
            {bookData ? (
                <div className="px-4 py-12 md:px-16 flex flex-col md:flex-row bg-zinc-900 gap-6">
                    <div className="w-full md:w-3/6 mx-auto md:mx-12 flex bg-zinc-800 p-4 md:p-8  gap-8  lg:gap-16 relative">
                        <div className="flex flex-col gap-4 md:gap-8 img h-[50vh] md:h-[80vh]">
                            <img className="h-full object-cover" src={bookData.url} alt={bookData.title} />
                        </div>
                        {isLoggedIn && role === "user" && (
                            <div className=" bottom-4 right-4 flex  flex-col gap-4 md:gap-8 md:flex-col">
                                <button onClick={handleFavourites} className="bg-white p-2 hover:text-red-800 text-red-500 rounded-full text-xl md:text-2xl w-10 h-10">
                                    <FaHeart />
                                </button>
                                <button onClick={handleCart} className="bg-white p-2 text-blue-500 hover:text-blue-800 rounded-full text-xl md:text-2xl w-10 h-10">
                                    <FaShoppingCart />
                                </button>
                            </div>
                        )}
                        {isLoggedIn && role === "admin" && (
                            <div className="bottom-4 right-4 flex flex-col gap-4 md:gap-8 md:flex-col">
                                <NavLink to={`/update-book/${id}`}>
                                    <button className="bg-white p-2 hover:text-blue-800 text-blue-500 rounded-full text-xl md:text-2xl w-10 h-10">
                                        <FaEdit />
                                    </button>
                                </NavLink>
                                <button onClick={deleteBook} className="bg-white p-2 text-red-500 hover:text-red-800 rounded-full text-xl md:text-2xl w-10 h-10">
                                    <MdDeleteSweep />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="desc text-white w-full md:w-3/6 mx-auto">
                        <h3 className="my-4 text-zinc-400 font-bold font-serif text-2xl md:text-4xl">{bookData.title}</h3>
                        <h2 className="text-zinc-500 text-lg md:text-xl my-4">by {bookData.author}</h2>
                        <p className="my-8 text-zinc-500">{bookData.desc}</p>
                        <div className="flex items-center gap-2">
                            <GrLanguage />
                            <p className="my-2 text-zinc-300">{bookData.language}</p>
                        </div>
                        <p className="text-lg md:text-2xl text-blue-300">Price: ₹ {bookData.price}</p>
                    </div>
                </div>
            ) : (
                <div className="h-screen flex justify-center items-center">
                    <Loader />
                </div>
            )}
        </>
    );
}

export default ViewBook;
