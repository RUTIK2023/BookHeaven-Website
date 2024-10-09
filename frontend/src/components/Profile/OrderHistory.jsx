// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import Loader from "../Loader/Loader";
// import Img from "../../assets/book.png";
// import { NavLink } from "react-router-dom";

// function OrderHistory() {

//     const headers = {
//         id: localStorage.getItem("id"),
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//     };
//     const [orderHistory, setOrderHistory] = useState();


//     useEffect(() => {

//         const fetch = async () => {
//             const apiUrl = import.meta.env.VITE_API_URL;
//             const response = await axios.get(`${apiUrl}/api/v1/get-order-history`, { headers });

//             setOrderHistory(response.data.data);
//             console.log(response.data.data);

//         };
//         fetch();
//     }, []);

//     return (
//         <>
//             {/* orderHistory */}


//             {!orderHistory && <div className=" flex items-center justify-center "><Loader /></div>}

//             {orderHistory && orderHistory.length === 0 && (

//                 <div className=" h-screen ">

//                     <div className=" h-[100%] flex items-center justify-center flex-col">

//                         <img className=" h-[30vh] " src={Img} alt="" />
//                         <h1 className=" text-3xl font-bold text-zinc-100">  no orders....</h1>
//                         <p className=" mt-2 text-zinc-100">Add cart books in it..</p>

//                     </div>
//                 </div>
//             )}

//             {orderHistory && orderHistory.length > 0 && (

//                 <div className=" h-[100%] p-0 md:p-4 text-zinc-400">
//                     <h1 className=" text-3xl p-4 font-semibold">Your Order History</h1>
//                     <div className=" font-semibold text-zinc-200  flex gap-4 px-4 py-2 rounded w-full mt-4 bg-zinc-800">

//                         <div className=" w-[3%]">
//                             <h1 className=" text-center">Sr.</h1>
//                         </div>
//                         <div className=" w-[22%]">
//                             <h1>Books</h1>
//                         </div>
//                         <div className=" w-[45%]">
//                             <h1>Description</h1>
//                         </div>
//                         <div className="w-[9%]">
//                             <h1> Price</h1>
//                         </div>
//                         <div className=" w-[16%]">
//                             <h1>Status</h1>
//                         </div>
//                         <div className=" w-[5%] md:block hidden">
//                             <h1>Mode</h1>
//                         </div>
//                     </div>

//                     {orderHistory.map((items, i) => (
//                         <div className=" flex gap-4 px-4 py-2 rounded w-full mt-4 bg-zinc-800 hover:bg-black">

//                             <div className=" w-[3%]">
//                                 <h1 className=" text-center">{i+1}</h1>
//                             </div>
//                             <div className=" w-[22%]">
                                
//                                 <NavLink  to={`/view-book-details/${items.book._id}`}>
//                                 <h1 className=" text-blue-500 underline font-semibold">{items.book.title}</h1>
//                                 </NavLink>

                            
                                
//                             </div>
//                             <div className=" w-[45%]">
//                                 <h1>{items.book.desc.slice(0,50)}...</h1>
//                             </div>
//                             <div className="w-[9%]">
//                                 <h1>₹ {items.book.price}</h1>
//                             </div>
//                             <div className=" w-[16%]">
//                                 <h1 className=" font-semibold text-green-500">
//                                     {items.status === "Order Placed" ? (
//                                         <div className=" text-yellow-500">{items.status}</div>
//                                     ): items.status=== "Canceled" ?(
//                                         <div className=" text-red-500">{items.status}</div>
//                                     ):(items.status)} 
//                                 </h1>
//                             </div>
//                             <div className=" w-[5%] md:block hidden">
//                                 <h1>COD</h1>
//                             </div>
//                         </div>
//                     ))

//                     }


                    
//                 </div>
//             )}

//         </>
//     )
// }

// export default OrderHistory;




import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import Img from "../../assets/order.avif";
import { NavLink } from "react-router-dom";

function OrderHistory() {

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const [orderHistory, setOrderHistory] = useState();


    useEffect(() => {

        const fetch = async () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${apiUrl}/api/v1/get-order-history`, { headers });

            setOrderHistory(response.data.data);
            console.log(response.data.data);

        };
        fetch();
    }, []);

    return (
        <>
            {/* orderHistory */}

            {!orderHistory && <div className=" flex items-center justify-center "><Loader /></div>}

            {orderHistory && orderHistory.length === 0 && (
                <div className=" h-screen ">
                    <div className=" h-[100%] flex items-center justify-center flex-col">
                        <img className=" h-[30vh] " src={Img} alt="" />
                        <h1 className=" text-3xl font-bold text-zinc-100">  no orders....</h1>
                        <p className=" mt-2 text-zinc-100">Add cart books in it..</p>
                    </div>
                </div>
            )}

            {orderHistory && orderHistory.length > 0 && (
                <div className=" h-[100%] px-2 md:p-4 text-zinc-400">
                    <h1 className=" text-3xl p-4 font-semibold">Your Order History</h1>
                    <div className=" font-semibold text-zinc-200  flex gap-4 px-4 py-2 rounded w-full mt-4 bg-zinc-800">
                        <div className=" w-[3%]">
                            <h1 className=" text-center">Sr.</h1>
                        </div>
                        <div className=" w-[22%]">
                            <h1>Books</h1>
                        </div>
                        <div className=" w-[45%]">
                            <h1>Description</h1>
                        </div>
                        <div className="w-[9%]">
                            <h1> Price</h1>
                        </div>
                        <div className=" w-[16%]">
                            <h1>Status</h1>
                        </div>
                        <div className=" w-[5%] md:block hidden">
                            <h1>Mode</h1>
                        </div>
                    </div>

                    {orderHistory.map((items, i) => (
                        <div className=" flex gap-4 px-4 py-2 rounded w-full mt-4 bg-zinc-800 hover:bg-black" key={items._id}>
                            <div className=" w-[3%]">
                                <h1 className=" text-center">{i + 1}</h1>
                            </div>

                            <div className=" w-[22%]">
                                {items.book ? (
                                    <NavLink to={`/view-book-details/${items.book._id}`}>
                                        <h1 className=" text-blue-500 underline font-semibold">
                                            {items.book.title}
                                        </h1>
                                    </NavLink>
                                ) : (
                                    <h1 className=" text-red-500">Book details unavailable</h1>
                                )}
                            </div>

                            <div className=" w-[45%]">
                                <h1>{items.book ? `${items.book.desc.slice(0, 50)}...` : "No description available"}</h1>
                            </div>

                            <div className="w-[9%]">
                                <h1>{items.book ? `₹ ${items.book.price}` : "N/A"}</h1>
                            </div>

                            <div className=" w-[16%]">
                                <h1 className=" font-semibold text-yellow-500">
                                    {items.status === "Order Placed" ? (
                                        <div className=" text-green-500">{items.status}</div>
                                    ) : items.status === "Canceled" ? (
                                        <div className=" text-red-500">{items.status}</div>
                                    ) : (
                                        items.status
                                    )}
                                </h1>
                            </div>

                            <div className=" w-[5%] md:block hidden">
                                <h1>COD</h1>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default OrderHistory;
