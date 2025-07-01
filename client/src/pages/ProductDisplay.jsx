import React from 'react'
import NavBar from '../components/NavBar'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus} from '@fortawesome/free-solid-svg-icons';

function ProductDisplay() {
  const locate=useLocation();
  const product=locate.state?.product;
  
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-between bg-slate-900'>
      <NavBar/>
      <div className='w-full h-185 flex flex-row items-center justify-center gap-30 bg-slate-800 rounded-lg shadow-lg'>
        <div className='w-100 h-100 flex items-center justify-center bg-gradient-to-r from-violet-600 to-violet-800 rounded-lg shadow-lg'>
          <img src={product?.imageUrl}/>
        </div>
        <div className='w-150 full-150 flex flex-col items-start justify-between text-white font-poppins gap-5'>
          <h1 className='text-4xl font-extrabold'>Name: {product?.product_name}</h1>
          <h1 className='text-3xl font-extrabold'>Price: ₹{product?.price}</h1>
          <h1 className='text-lg font-extrabold'>No of stocks: {product?.stock}</h1>
          <h1 className='text-lg font-extrabold'>{product?.description}</h1>
          <div className='w-100 h-15 flex flex-row items-center justify-around gap-10'>
            <button className='w-40 h-10 rounded-lg shadow-lg bg-violet-700 px-2 cursor-pointer'>Add to Cart <FontAwesomeIcon icon={faCartPlus}/></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay
