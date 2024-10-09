import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'


import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AllBooks from './pages/AllBooks'
import Cart from './pages/Cart'
import About from './pages/About'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Profile from './pages/Profile'
import AddBook from './pages/AddBook'
import AllOrders from './pages/AllOrders'
import UpdateBook from './pages/UpdateBook'
import Setting from './components/Profile/Setting'
import Favourites from './components/Profile/Favourites'
import OrderHistory from './components/Profile/OrderHistory'
import ViewBook from './components/ViewBook/ViewBook'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const dispatch=useDispatch();
  const role=useSelector((state)=>state.auth.role);

  useEffect(()=>{

    if( 
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[]);

  return (
    <>
      <Navbar/>

      <Routes>
        <Route exact path='/' element={<Home/>} ></Route>
        <Route  path='/login' element={<Login/>} ></Route>
        <Route  path='/signup' element={<Signup/>} ></Route>
        <Route  path='/cart' element={<Cart/>} ></Route>
        <Route  path='/update-book/:id' element={<UpdateBook/>} ></Route>
        <Route  path='/about' element={<About/>} ></Route>
        <Route  path='/allbooks' element={<AllBooks/>} ></Route>
        <Route  path='/profile' element={<Profile/>} >
            {  role ==="user" ? (<Route index element={<Favourites/>}></Route>)
                  :
                  (<Route index element={<AllOrders/>}></Route>)

            }

            {
              role=="admin" &&(
                <Route path='/profile/add-book' element={<AddBook/>}></Route>
              )
            }
            
            <Route path='/profile/orderHistory' element={<OrderHistory/>}></Route>
            <Route path='/profile/setting' element={<Setting/>}></Route>
        </Route>
        <Route  path='/view-book-details/:id' element={<ViewBook/>} >
        </Route>
      </Routes>


      <ToastContainer />
      <Footer/>
  
    
      
    </>
  )
}

export default App;
