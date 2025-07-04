import { faCartPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MessageBox from '../components/MessageBox';

function ProductCard({ product, index }) {
  const navigate=useNavigate();
  const [showMessage,setShowMessage]=useState(false);
  const [message,setMessage]=useState();
  const [color,setColor]=useState();

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("CartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("CartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const addTOCart = (product, quantity) => {
    const updatedProd = {
      product_id: product.product_id,
      product_name: product.product_name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity || 1,
    };
    setCartItems([...cartItems, updatedProd]);
    setShowMessage(true)
    setMessage("Added to cart")
    setColor("bg-green-500")
  };


  const deleteProducts = async (data) => {
    const url = `http://localhost:8080/api/deleteProducts`
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    try {
      const response = await fetch(url, options)
      console.log(response)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      console.log(data);
      
      setShowMessage(true);
      setMessage(data.message);
      setColor("bg-green-600");
      let products=JSON.parse(localStorage.getItem("Products")||"[]");
      products = products.filter(item => item.product_id !== product.product_id);
      localStorage.setItem("Products", JSON.stringify(products));

      
    } catch (error) {
      setShowMessage(true);
      setMessage(error.message);
      setColor("bg-red-600");
    }
  }

  return (
    <div 
    index={index} 
    key={index}
    onClick={(e)=>{
      const tag = e.target.tagName.toLowerCase();
      if (
        !(tag === 'button' || e.target.closest('button') ||
          tag === 'input' || e.target.closest('input'))
      ) {
        navigate("/product", { state: { product } });
      }
    }}
    className='basis-1/5 bg-gradient-to-r from-violet-600 to-violet-800 w-60 h-80 rounded-2xl shadow-xl flex flex-col items-center justify-between p-4 font-poppins text-white transition-transform hover:scale-105'>
      <div className='w-full h-40 flex items-center justify-center'>
        <img src={product?.imageUrl} className='w-36 h-36 object-contain rounded-md' />
      </div>
      <div className='flex flex-col items-center justify-between gap-2 w-full'>
        <h2 className='text-xl font-semibold text-center truncate w-full'>{product?.product_name}</h2>
        <p className='text-lg text-center'>Price: ₹{product?.price}</p>
        <input onChange={updateQuantity} type="number" placeholder='quantity' className='bg-slate-800 rounded-lg shadow-lg text-white font-poppins w-40 text-center'/>
        <div className='w-full flex flex-row items-center justify-around mt-2'>
          <button 
          onClick={()=>addTOCart(product,quantity)}
          className='bg-slate-700 w-20 rounded-xl shadow-md p-2 text-white cursor-pointer hover:bg-slate-600 active:scale-95 transition'>
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
          <button onClick={(e) => {
            e.stopPropagation();
            deleteProducts(product,quantity);
          }} className='bg-white w-20 cursor-pointer rounded-xl shadow-md p-2 text-violet-600 hover:bg-gray-200 active:scale-95 transition'>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      {
        showMessage ? (
          <MessageBox color={color} message={message}/>
      ):null
    }
    </div>
    
  )
}

export default ProductCard
