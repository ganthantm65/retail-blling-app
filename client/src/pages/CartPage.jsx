import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import CartItem from '../components/CartItem'
import MessageBox from '../components/MessageBox';
import Invoice from '../components/Invoice';
import JwtValidator from '../components/JwtValidator';

function CartPage() {
  const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("CartItems");
        return saved ? JSON.parse(saved) : [];
  });
  const [name,setName]=useState();
  const [phone,setPhone]=useState();
  const [showMessage,setShowMessage]=useState(false);
  const [message,setMessage]=useState()
  const [color,setColor]=useState()
  const [visible,setVisible]=useState(false)

  const updateVisible=()=>{
    setVisible(!visible)
  }

   useEffect(()=>{
    if(JwtValidator(localStorage.getItem("Token"))){
      localStorage.clear();
      window.location.href='/auth/login';
    }
  },[])

  const updateName=(e)=>{
    setName(e.target.value);
  }

  const updatePhone=(e)=>{
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  }

  
  const deleteCartItem=(cartItem)=>{
    const updatedCartItems=cartItems.filter((item)=>item.product_id!=cartItem.product_id);
    setCartItems(updatedCartItems)
    localStorage.setItem("CartItems",JSON.stringify(updatedCartItems))
  }

  const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  let taxRate = total*0.12;
  taxRate = parseFloat(taxRate.toFixed(2));
  const grandTotal = parseFloat((total + taxRate).toFixed(2));

  const createBill = async (cartItems, name,phone, paymentMethod) => {
    const purchaseDate = new Date().toISOString().slice(0, 10);

    const purchasedItems = cartItems.map(item => ({
      products: {
        product_id: item.product_id,
      },
      quantity: parseInt(item.quantity),
      unit_price: parseFloat(item.price),
      subtotal: parseFloat((item.quantity * item.price).toFixed(2)),
    }));


    const billDTO = {
      customer: {
        customer_name: name,
        phone_no: phone,
      },
      purchase: {
        date: purchaseDate,
        total_amount:grandTotal,
        status: "Completed",
        payment_method: paymentMethod,
      },
      purchasedItems
    };

    console.log(billDTO);
    try {
          const res = await fetch("http://localhost:8080/api/createBill", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(billDTO)
        });
        console.log(res);
        if(!res.ok){
          throw new Error(res.statusText)
        }
        setShowMessage(true);
        setMessage('Payment Done Successfull')
        setColor('bg-green-500')
        setName("")
        setPhone("")
    } catch (error) {
      setShowMessage(true);
      setMessage('Error in payment:'+error.message)
      setColor('bg-red-500')
    }
  };

  const deleteAllCartItems=()=>{
    setCartItems([]);
    localStorage.setItem("CartItems",JSON.stringify([]))
  }

  return (
    <div className='w-screen h-screen bg-slate-900 flex flex-col items-center justify-between'>
      {
        showMessage ? (
          <MessageBox message={message} color={color}/>
        ):null
      }
      {
          visible ? (
            <Invoice cartItems={cartItems} total={total} tax={taxRate} visible={visible} updateVisible={updateName}/>
          ):null
        }
      <NavBar/>
      <div className='w-full h-180 flex flex-row items-center justify-center gap-10'>
        <div className='w-300 h-full flex flex-col items-start justify-between bg-slate-800 rounded-lg shadow-lg p-10 gap-3'>
          <div className='w-280 h-full flex flex-col items-start justify-start gap-3 overflow-y-auto'>
              {
                cartItems.length>0 ? (
                  cartItems.map((cartItem,index)=>{
                    return (
                      <CartItem cartItem={cartItem} deleteCartItem={deleteCartItem} key={index}/>
                    )
                  })
                ):(
                  <h1 className='text-white font-poppins font-bold text-3xl'>No cart items found</h1>
                )
              }
          </div>
          <div className='w-full flex flex-row items-center justify-end'>
            <button onClick={deleteAllCartItems} className='w-50 h-10 rounded-lg shadow-lg bg-red-500 text-white'>Delete All</button>
          </div>
        </div>
        <div className='w-110 h-full flex flex-col items-center justify-center gap-10 bg-violet-700 rounded-lg shadow-lg'>
          <div className='flex flex-col items-start justify-evenly gap-5'>
            <label className='text-xl font-poppins text-white' >Customer Name:</label>
            <input value={name} type="text" onChange={updateName} className='w-100 h-10 bg-white rounded-lg shadow-lg p-4' />
            <label className='text-xl font-poppins text-white'>Customer's Phone</label>
            <input value={phone} onChange={updatePhone} type="text" className='w-100 h-10 bg-white rounded-lg shadow-lg p-4' />
          </div>
          <h1 className='text-2xl font-poppins text-white'>Amount: ₹ {total}</h1>
          <h1 className='text-2xl font-poppins text-white'>GST: ₹ {taxRate}</h1>
          <h1 className='text-2xl font-poppins text-white'>Total: ₹ {grandTotal}</h1>
          <button 
          onClick={()=>createBill(cartItems,name,phone,"Cash")}
          className='w-100 h-10 bg-slate-800 rounded-lg shadow-lg pb-2 text-white cursor-pointer'>Pay Cash</button>
          <button
          onClick={updateVisible}
          className='w-100 h-10 bg-slate-800 rounded-lg shadow-lg pb-2 text-white cursor-pointer'>Generate Invoice</button>
        </div>
        
      </div>
    </div>
  )
}

export default CartPage
