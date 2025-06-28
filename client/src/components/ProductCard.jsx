import { faCartPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function ProductCard({product,index}) {
  return (
    <div index={index} className='basis-1/5 bg-gradient-to-r from-violet-600 to-violet-800 w-60 h-80 rounded-lg shadow-lg flex flex-col items-center justify-between p-5 font-poppins text-white'>
        <img src={product?.imageUrl} className='w-40 h-40 object-fill'/>
        <div className='flex flex-col items-baseline justify-between'>
            <h2 className='text-xl font-semibold'>{product?.product_name}</h2>
            <p className='text-lg'>Price: ${product?.price}</p>
            <div className='w-full h-10 flex flex-row items-center justify-between'>
                <button className='bg-green-600 rounded-lg shadow-lg p-2 text-white'>
                    <FontAwesomeIcon icon={faCartPlus} />
                </button>
                <button className='bg-red-600 rounded-lg shadow-lg p-2 text-white'>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard
