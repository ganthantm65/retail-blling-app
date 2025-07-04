import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import JwtValidator from '../components/JwtValidator';

function Dashboard() {
  const [purchase,setPurchase]=useState([])

  const saleAmount=purchase.reduce((sum,p)=>sum+p?.total_amount,0);

  const getPurchase=async()=>{
      const url='http://localhost:8080/api/getPurchases';
      const options={
        method:"GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("Token")}`,
          "Content-Type":"application/json"
        }
      }
      try {
        const response=await fetch(url,options);
        if(!response.ok){
          throw new Error(response.statusText);
        }
        const data=await response.json();
        setPurchase(data)
        
      } catch (error) {
        console.log(error);
        
      }
    }

  useEffect(()=>{
    getPurchase()
  },[])
   useEffect(()=>{
   if(JwtValidator(localStorage.getItem("Token"))){
      localStorage.clear();
      window.location.href='/auth/login';
    }
  },[])
  return (
    <div className='w-screen h-screen bg-slate-900 relative overflow-hidden flex flex-col items-center justify-between'>
      <NavBar/>
      <div className='w-410 h-70 flex flex-row items-center justify-between'>
        <div className='w-200 h-full rounded-lg shadow-lg bg-gradient-to-r from-cyan-500 to-violet-700 flex flex-col items-center justify-center gap-2'>
          <h3 className='text-white font-poppins text-2xl'>Total Sales Amount</h3>
          <h2 className='text-white font-poppins text-5xl'>₹ {saleAmount}</h2>
        </div>
        <div className='w-200 h-full rounded-lg shadow-lg bg-gradient-to-r from-violet-800 to-violet-500 flex flex-col items-center justify-center gap-2'>
          <h3 className='text-white font-poppins text-2xl'>Total Sales </h3>
          <h2 className='text-white font-poppins text-5xl'>{purchase.length}</h2>
        </div>
      </div>
      <div className="w-410 h-100 mb-5 bg-slate-800 p-6 flex flex-col items-center text-white font-poppins rounded-lg overflow-y-auto">
        <table className="table-auto w-400 text-left border border-slate-700 rounded-lg overflow-hidden">
          <thead className="bg-violet-600 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-violet-500">Purchase No</th>
              <th className="py-3 px-4 border-b border-violet-500">Date</th>
              <th className="py-3 px-4 border-b border-violet-500">Customer</th>
              <th className="py-3 px-4 border-b border-violet-500">Payment Method</th>
              <th className="py-3 px-4 border-b border-violet-500">Status</th>
              <th className="py-3 px-4 border-b border-violet-500">Amount</th>
            </tr>
          </thead>
          <tbody>
            {purchase.map((p, index) => (
              <tr key={index} className="hover:bg-slate-700 transition">
                <td className="py-3 px-4 border-b border-slate-700">{index + 1}</td>
                <td className="py-3 px-4 border-b border-slate-700">{p?.date}</td>
                <td className="py-3 px-4 border-b border-slate-700">{p?.customer_name}</td>
                <td className="py-3 px-4 border-b border-slate-700">{p?.payment_method}</td>
                <td className="py-3 px-4 border-b border-slate-700">{p?.status}</td>
                <td className="py-3 px-4 border-b border-slate-700">₹{p?.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Dashboard
