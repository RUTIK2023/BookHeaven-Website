import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaUserAlt, FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import OrderHistory from "../components/Profile/OrderHistory";
import { toast } from "react-toastify";
import UserDetailsModal from "./UserDatailsModal";


function AllOrders() {
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDivData, setUserDivData] = useState(null); // Store user data for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const getOrders = async () => {
      const response = await axios.get(`${apiUrl}/api/v1/get-all-orders`, { headers });
      setAllOrders(response.data.data);
    };
    getOrders();
  }, []);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = allOrders[i]._id;
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await axios.put(`${apiUrl}/api/v1/update-status/${id}`, values, { headers });

    toast.success(response.data.message);
  };

  const openUserDetails = (user) => {
    setUserDivData(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserDivData(null);
  };

  return (
    <>
      {!allOrders && (
        <div className="flex justify-center items-center w-full">
          <Loader />
        </div>
      )}

      {allOrders && allOrders.length > 0 && (
        <div className="pr-4 p-2 lg:p-0">
          <h1 className="text-xl text-zinc-500 p-4 font-semibold">All Order History</h1>
          <div className="font-semibold  text-zinc-200 flex gap-4 px-4 py-2 rounded w-full mt-4 bg-zinc-800">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-[45%]">
              <h1>Description</h1>
            </div>
            <div className="w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="text-center w-[5%] md:block hidden">
              <FaUserAlt />
            </div>
          </div>

          {allOrders.map((items, i) => (
            <div className="flex gap-4 text-zinc-100 px-4 py-2 rounded w-full mt-4 bg-zinc-800 hover:bg-black" key={i}>
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                {items.book ? (
                  <NavLink to={`/view-book-details/${items.book._id}`}>
                    <h1 className="text-blue-500 underline font-semibold">{items.book.title}</h1>
                  </NavLink>
                ) : (
                  <h1 className="text-red-500">Book Unavailable</h1>
                )}
              </div>
              <div className="w-[45%]">
                <h1>{items.book ? `${items.book.desc.slice(0, 50)}...` : "No description available"}</h1>
              </div>
              <div className="w-[9%]">
                <h1>{items.book ? `₹ ${items.book.price}` : "N/A"}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="font-semibold">
                  <button className="hover:scale-105 transition-all duration-300" onClick={() => setOptions(i)}>
                    {items.status === "Order Placed" ? (
                      <div className="text-green-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-yellow-500">{items.status}</div>
                    )}
                  </button>

                  <div className={`${options === i ? "block" : "hidden"} flex mt-4`}>
                    <select name="status" className="bg-gray-800" value={values.status} onChange={change}>
                      {["Order placed", "Out for delivery", "Canceled"].map((item, i) => (
                        <option value={item} key={i}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <button
                      className="text-green-500 hover:text-pink-500 mx-2"
                      onClick={() => {
                        setOptions(-1);
                        submitChanges(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[5%] md:block hidden">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => openUserDetails(items.user)}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && userDivData && (
        <UserDetailsModal userData={userDivData} closeModal={closeModal} />
      )}
    </>
  );
}

export default AllOrders;
