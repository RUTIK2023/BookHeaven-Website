import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/auth";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

function Sidebar({data}){


    const dispatch=useDispatch();
    const history=useNavigate();
    const role = useSelector((state) => state.auth.role);


    return (
        <>
        <div className=" mx-4 text-white p-6 flex flex-col justify-between h-[100%] bg-zinc-800  rounded ">
            <div className=" flex flex-col items-center gap-2">
                <img src={data.avatar} alt="" />
                <h3>{data.username}</h3>
                <p>{data.email}</p>
                <div className=" h-[1px]  bg-white text-white w-full"></div>
            </div>

            {
                role==="user" && (
                    <div className=" flex flex-col items-center gap-4">
                    <NavLink className=' p-2 w-full text-center hover:bg-zinc-900' to='/profile'>
                        Favourites
                    </NavLink>
                    <NavLink className=' p-2 w-full text-center hover:bg-zinc-900' to='/profile/orderHistory'>
                        Order History
                    </NavLink>
                    <NavLink className=' p-2 w-full text-center hover:bg-zinc-900' to='/profile/setting'>
                        Setting
                    </NavLink>
    
    
    
                </div>
                )
            }
            {
                role==="admin" && (
                    <div className=" flex flex-col items-center gap-4">
                    {/* <NavLink className=' p-2 w-full text-center hover:bg-zinc-900' to='/profile'>
                        Favourites
                    </NavLink> */}
                    <NavLink className=' p-2 w-full text-center hover:bg-zinc-900' to='/profile'>
                        All Orders
                    </NavLink>
                    <NavLink className=' p-2 w-full text-center hover:bg-zinc-900' to='/profile/add-book'>
                        Add Books
                    </NavLink>
    
    
    
                </div>
                )
            }
           
            <div className=" items-center text-center">
                
                    <button className=" w-[90%] bg-zinc-950 border-2 px-4 hover:bg-blue-700  py-1 rounded "
                        onClick={()=>{
                            dispatch(authActions.logout());
                            dispatch(authActions.changeRole("user"));
                            localStorage.clear("id");
                            localStorage.clear("token");
                            localStorage.clear("role");
                            history('/');
                            toast.success("Logout Successfully!")
                        }}
                    
                    >
                        Logout
                    </button>
        
            </div>
        </div>
        
        </>
    )
};

export default Sidebar;