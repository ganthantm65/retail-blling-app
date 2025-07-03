import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

function CartItem({cartItem,deleteCartItem}) {
  return (
    <div className='w-280 h-35 bg-gradient-to-r from-blue-500 to-violet-400 flex flex-row items-center justify-between gap-4 rounded-lg shadow-lg p-4 text-2xl font-poppins'>
      <img src={cartItem?.imageUrl} className='w-20 h-20' />
      <h1>{cartItem?.product_name}</h1>
      <h1>{cartItem?.quantity}</h1>
      <h1>₹ {cartItem?.price*cartItem?.quantity}</h1>
      <button onClick={()=>deleteCartItem(cartItem)} className='w-10 h-10 rounded-lg shadow-lg bg-slate-800 text-white'>
        <FontAwesomeIcon icon={faTrash}/>
      </button>
    </div>
  )
}

export default CartItem
