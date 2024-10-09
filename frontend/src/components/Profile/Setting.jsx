import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
// import { useEffect } from "react-router-dom";
import Loader from "../Loader/Loader";
// import { useEffect } from "react";

function Setting(){
    const [data,setData]=useState({address:""});
    const[profileData,setProfileData]=useState();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };


    useEffect(() => {

        const fetch = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${apiUrl}/api/v1/get-user-info`, { headers });

            setProfileData(response.data);

            setData({address:response.data.address});
            // console.log(response.data.address);
            // console.log(response.data);

        };
        fetch();
    }, []);


    // address change..
    const changeHandler=(e)=>{
        const {name,value}=e.target;
        setData({...data,[name]:value});
    }

    const changeAddress=async()=>{
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.put(`${apiUrl}/api/v1/update-address`,data, { headers });

        toast.success(response.data.message);

    }

    return(
        <>

            <div>
                {!profileData && ( <div className=" flex items-center justify-center  w-full h-[100%]"> <Loader/></div> ) }


                {profileData && (

                    <div className=" bg-zinc-800 border rounded  py-8 px-4 m-4">

                        <div className="flex gap-10  mb-4">

                            <div className="  text-zinc-400 ">
                                username:
                                <h1 className="mt-2 bg-zinc-600 text-zinc-300 w-auto rounded py-1 px-2">{profileData.username}</h1>
                            </div>
                            <div className=" text-zinc-400">
                                Email:
                                <h1  className="mt-2 bg-zinc-600 text-zinc-300 w-auto rounded py-1 px-2">{profileData.email}</h1>
                            </div>
                            
                        </div>
                        <div className="flex flex-col gap-4 w-full   text-zinc-400 ">
                            <h1>Address:</h1>
                            <textarea className=" mt-0 text-white w-full p-2 rounded bg-zinc-900" name="address" value={data.address} rows={5} onChange={changeHandler} >
                                
                            </textarea>
                        </div>
                        <div className="  flex justify-end mt-6">
                            <button  onClick={changeAddress} className=" bg-yellow-500 p-2 rounded text-md font-semibold hover:bg-yellow-700 ">Update</button>
                        </div>
                    </div>

                )}

            </div>
        
        </>
    )
}

export default Setting;