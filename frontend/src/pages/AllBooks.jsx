import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";



function AllBooks(){
    

    const [Data,setData]=useState();

    useEffect(()=>{
        const apiUrl = import.meta.env.VITE_API_URL;
        const getBooks=async ()=>{

            const response=await axios.get(`${apiUrl}/api/v1/get-all-books`);

            // console.log(response.data.data);
            setData(response.data.data);
        };

        getBooks();

    },[]);

    // most recent books...
    
    return(
        <>
        <div className=" bg-zinc-900 py-12 border-b text-white text-3xl">
        <h1 className="text-zinc-300 font-serif mx-12  mb-8 border-b-2 pb-2 text-4xl">All Books</h1>
            {/* <h1 className=" text-2xl font-serif text-zinc-200 mx-12 ">All Books</h1> */}
            {!Data && <div className=" flex justify-center items-center align-middle text-5xl"><Loader/></div>}
            <div className="  grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-16 mx-12">
                {Data && 
                    Data.map((items,i)=>(
                        <div key={i}>

                            <BookCard  data={items}/>
                        </div>
                ))}
            </div>
        </div>
        
        </>
    )
}

export default AllBooks;