import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
    const userName=localStorage.getItem("userName");
    if(!userName){
        window.location.href="/auth/login";
    }
    const [visible,setVisible]=useState(false);
    const updateVisisblity=()=>{
        setVisible(!visible);
    }
    const navigate=useNavigate();
  return (
    <div className='w-full h-16 bg-slate-800 flex flex-row items-center justify-between shadow-lg font-poppins text-white px-10'>
        <h1 className='text-3xl font-extrabold'>Retail Billing</h1>
        <div className='flex flex-row items-center gap-5'>
            <p className='cursor-pointer'><Link to="/dashboard">DASHBOARD</Link></p>
            <p className='cursor-pointer'><Link to="/manageCategory">MANAGE CATEGORIES</Link></p>
            <p className='cursor-pointer'><Link to='/manageProducts'>MANAGE PRODUCTS</Link></p>
            <p className='cursor-pointer'>MANAGE ADMIN</p>
        </div>
        <div className='rounded-full bg-white w-10 h-10 flex items-center justify-center cursor-pointer' onClick={updateVisisblity}>
            <FontAwesomeIcon icon={faUser} className='text-zinc-500'/>
            {visible ? (
                <div className='flex flex-col items-center justify-around absolute top-16 right-10 bg-slate-800 w-40 h-40 rounded-lg shadow-lg text-white'>
                    <p className=' text-lg font-semibold'>{userName}</p>'
                    <button onClick={
                        ()=>{
                            localStorage.removeItem("Token");
                            navigate("/");
                        }
                    } className='bg-violet-700 text-white w-30 h-10 p-2 rounded-lg cursor-pointer'>Logout</button>
                </div>
                ) : null
            }

        </div>
    </div>
  )
}

export default NavBar
