import React from "react";
import heroImg from "../../assets/hero.jpg";
import { NavLink } from "react-router-dom";

function Hero() {
    return (
        <div className="bg-zinc-800 h-auto md:h-[75vh] flex flex-col md:flex-row border-b border-zinc-700">
            {/* Text Section */}
            <div className="w-full md:w-3/6 my-auto px-6 py-8 md:py-0 items-center">
                <h1 className="my-4 text-yellow-600 text-3xl md:text-5xl font-semibold">
                    Discover Your Next <p>Great Read</p>
                </h1>
                <p className="mr-6 my-4 text-white text-base md:text-lg">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam, repellendus quidem corporis quasi sint officiis earum illo suscipit ab reiciendis assumenda, sunt, exercitationem vel natus eligendi delectus ut voluptas provident.
                </p>
                
                <NavLink to='/allbooks'>
                    <button className="hover:bg-blue-500 my-6 border-2 border-black px-4 py-2 w-40 rounded-full font-semibold bg-blue-100">
                        Discover Books
                    </button>
                </NavLink>
            </div>

            {/* Image Section */}
            <div className="img w-full md:w-3/6">
                <img className="h-64 md:h-full w-full object-cover rounded-sm" src={heroImg} alt="Hero" />
            </div>
        </div>
    );
}

export default Hero;
