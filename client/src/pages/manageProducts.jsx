import React from 'react'
import NavBar from '../components/NavBar'

const ManageProducts = () => {
  return (
    <div className='w-screen h-screen bg-slate-900 relative overflow-hidden flex flex-col items-center justify-between'>
      <NavBar/>
      <div className='w-full h-full flex flex-row items-center justify-center font-poppins'>
        <div className='w-310 h-180 bg-slate-800 rounded-lg shadow-lg flex flex-col items-baseline justify-around gap-5 p-10 overflow-y-auto'>

        </div>
        <div className='w-100 h-180 bg-violet-800 rounded-lg shadow-lg flex flex-col items-baseline justify-evenly gap-5 p-10 ml-10'>
            <h1 className='text-2xl text-white font-bold'>Add Products</h1>
            <form className='w-full h-full flex flex-col items-start justify-evenly'>
                <label>Product Name</label>
                <input type="text" placeholder='Eg.Samsung S23' className='w-86 h-10 p-5 bg-white shadow-lg rounded-lg' required/>
                <label>Product Price</label>
                <input type="number" placeholder='Eg. 1000' className='w-86 h-10 p-5 bg-white shadow-lg rounded-lg' required/>
                <label>Description</label>
                <textarea placeholder='Eg.Samsung S23 is a flagship smartphone with...' className='w-86 h-20 p-5 bg-white shadow-lg rounded-lg' required></textarea>
                <label>Image URL</label>
                <input type="url" placeholder='Eg. http://example.com/image.png' className='w-86 h-10 p-5 bg-white shadow-lg rounded-lg' required/>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ManageProducts
