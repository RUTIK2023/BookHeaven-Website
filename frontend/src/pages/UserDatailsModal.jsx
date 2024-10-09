import React from "react";

const UserDetailsModal = ({ userData, closeModal }) => {
  return (
    <div className=" p-8 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-700 w-[40%] text-gray-400 p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-2">User Details</h2>
        <div className="mb-2">
          <img src={userData.avatar} alt="Avatar" className="w-16 h-16 rounded-full mb-2" />
          <p> <strong className=" text-slate-100 font-semibold">Username:</strong> {userData.username}</p>
          <p> <strong className=" text-slate-100 font-semibold">Email:</strong> {userData.email}</p>
          <p> <strong className=" text-slate-100 font-semibold">Address:</strong> {userData.address}</p>
        </div>
        <button className="bg-red-500 text-white py-1 px-3 rounded" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;