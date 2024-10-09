import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";

function Profile() {
    const [profile, setProfile] = useState();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const getUser = async () => {
            const response = await axios.get(`${apiUrl}/api/v1/get-user-info`, { headers });
            setProfile(response.data);
        };

        getUser();
    }, []);

    return (
        <>
            <div className="bg-zinc-900 flex flex-col md:flex-row h-screen gap-4 py-8 overflow-hidden"> {/* Ensure proper height and hidden overflow */}
                {
                    !profile && (
                        <div className="flex justify-center items-center w-full h-full"> 
                            <Loader />
                        </div>
                    )
                }
                {profile && (
                    <>
                        <div className="sidebar p-4 h-full w-full md:w-1/4">
                            <Sidebar data={profile} />
                        </div>
                        
                        <div className="w-full md:w-3/4 overflow-auto"> 
                            <Outlet />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Profile;
