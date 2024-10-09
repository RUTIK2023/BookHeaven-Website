import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";
import Img from "../assets/Cart.jpg";
import { NavLink, useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const getCart = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/get-user-cart`, { headers });
      setCart(response.data.data);
    };

    getCart();
  }, [cart]);

  const deleteItem = async (bookid) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await axios.put(`${apiUrl}/api/v1/remove-from-cart/${bookid}`, {}, { headers });
    toast.error(response.data.message);
  };

  // Calculate total price
  useEffect(() => {
    if (cart && cart.length > 0) {
      const totalAmount = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
      setTotal(totalAmount);
    }
  }, [cart]);

  // Place order
  const placeOrder = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/v1/place-order`, { order: cart }, { headers });
      toast.success(response.data.message);
      navigate('/profile/orderHistory');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 px-4 md:px-12 py-6 min-h-screen flex flex-col justify-between">
      {!cart && <Loader />}

      {cart && cart.length === 0 && (
        <div className="flex-grow flex gap-4 items-center justify-center flex-col">
          <img className="h-[30vh] opacity-80" src={Img} alt="" />
          <h1 className="text-3xl font-bold text-zinc-100">Empty Cart!</h1>
          <p className="mt-2 text-zinc-100">
            Add books in the Cart...{" "}
            <NavLink to="/allbooks" className="text-blue-400 hover:underline">
              Add To Cart
            </NavLink>
          </p>
        </div>
      )}

      {cart && cart.length > 0 && (
        <div className="flex-grow">
          <h1 className="text-2xl md:text-3xl font-semibold mb-8 pt-4 text-white text-center">Your Cart</h1>

          {cart.map((items, i) => (
            <div
              className="flex flex-col md:flex-row justify-between gap-4 items-center p-4 bg-zinc-800 rounded-lg my-4 shadow-md hover:shadow-lg transition-shadow duration-300"
              key={i}
            >
              <div className="flex gap-2 items-center w-full md:w-auto">
                <img className="h-[20vh] md:h-[10vh] object-cover rounded" src={items.url} alt="" />
                <div className="ml-4">
                  <h1 className="text-xl md:text-2xl font-serif text-yellow-600 font-semibold">{items.title}</h1>
                  <p className="text-zinc-400 mt-2 hidden lg:block">- by {items.author}</p>
                </div>
              </div>
              <div className="flex gap-6 items-center justify-between w-full md:w-auto mt-4 md:mt-0">
                <h2 className="text-zinc-300 text-2xl md:text-3xl">₹ {items.price}</h2>
                <button
                  onClick={() => deleteItem(items._id)}
                  className="bg-red-100 text-red-500 rounded p-2 flex items-center hover:bg-red-300 transition-colors duration-200"
                >
                  <MdDeleteSweep />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded shadow-lg w-full md:w-auto">
              <h1 className="text-2xl md:text-3xl text-zinc-200 font-semibold">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-lg md:text-xl text-zinc-200">
                <h2>{cart.length} books</h2>
                <h2 className="text-blue-600">₹ {total}</h2>
              </div>
              <div className="mt-3">
                <button
                  onClick={placeOrder}
                  className="bg-blue-500 text-white p-2 text-lg md:text-xl px-4 w-full font-semibold rounded hover:bg-blue-600 transition-colors duration-200"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
