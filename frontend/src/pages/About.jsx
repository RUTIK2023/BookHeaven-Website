import React from "react";
import ownImg from "../assets/logo1.jpg"
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

function About() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold mb-4 text-white">About Our Book Store</h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Discover a world of books at your fingertips. We bring readers the best selection of books, from classic literature to modern-day masterpieces.
                </p>
            </div>

            {/* Owner Section */}
            <div className="flex flex-col md:flex-row justify-center items-center mb-16 space-y-8 md:space-y-0 md:space-x-12">
                <img
                    src={ownImg}
                    alt="Owner"
                    className="w-48 h-48 rounded-full border-4 border-gray-500 shadow-lg"
                />
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-semibold text-white mb-2">Meet Our Founder</h2>
                    <p className="text-lg text-gray-300">
                        Our bookstore was founded by Rutik Utekar, a lifelong reader and passionate advocate for the literary community. Jane’s vision is to create a space where books ignite the imagination and inspire learning.
                    </p>
                </div>
            </div>

            {/* Store Vision Section */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-white text-center">Our Vision</h2>
                <p className="text-lg text-gray-300 text-center">
                    To create a welcoming environment where readers of all ages and interests can discover the joy of reading. We are committed to offering a wide variety of books to inspire curiosity and encourage a lifelong love of literature.
                </p>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-white text-center">Contact Us</h2>
                <p className="text-lg text-gray-300 text-center">
                    Have any questions or suggestions? Feel free to reach out to us at{" "}
                    <a href="mailto:rutikutekar2003@gmail.com" className="text-blue-400 underline hover:text-blue-500">
                        rutikutekar2003@gmail.com
                    </a>.
                </p>
            </div>

            {/* Social Media Section */}
            <div className="flex justify-center space-x-6 mt-12">
                <div className=" flex flex-row">
                    <a  href="https://www.linkedin.com/in/rutik-sakharam-utekar" className=" text-blue-600 hover:text-blue-500 flex items-center gap-1  transition">
                        <FaLinkedin className="text-gray-300" /> Linkedin
                    </a>
                </div>
                <a href="https://x.com/rutikutekar45?t=RXMcKfYYbCurTFp8nPaoXQ&s=08" className="text-blue-500 flex items-center hover:text-blue-500 gap-1 transition">
                    <FaSquareXTwitter className=" text-b" /> Twitter
                </a>
                <a href="https://www.instagram.com/rutikutekar2003/profilecard/?igsh=Z3U3MDQ3Mzl6dzEz" className="text-blue-500 flex items-center gap-1 hover:text-blue-500 transition">
                    <FaSquareInstagram className=" text-pink-600"/> Instagram
                </a>
            </div>
        </div>
    );
}

export default About;
