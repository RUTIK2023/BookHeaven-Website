import React from "react";
import bookImg from '..//../assets/books.png'


function EmptyCard(){
    return(
        <>

        <div className=" text-white m-auto p-4 ml-16  lg:mx-4">
            {/* <img src={bookImg} alt="" /> */}
            <p className=" font-semibold text-xl my-4 text-center ">Oops! No Favourites books found...</p>

        </div>

        
        </>
    )
}

export default EmptyCard;