import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const History = () => {
    const [purchasedItems,setPurchasedItems]=useState([])

    const [searchValue,setSearchValue]=useState()

    const updateValue=(e)=>{
        setSearchValue(e.target.value)
    }

    useEffect(()=>{
        getPurchasedItems();
    },[])
    const getPurchasedItems=async()=>{
        const url="http://localhost:8080/api/getPurchasedItems"
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
            console.log(data);
            
            setPurchasedItems(data)
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const searchPurchaseItem=(itemName)=>{
        const updateItems=purchasedItems.filter((p)=>p.productName==itemName);
        setPurchasedItems(updateItems);
    }
    useEffect(()=>{
        if(searchValue===""){
            getPurchasedItems();
        }
    },[searchValue])
  return (
    <div className='w-screen h-screen bg-slate-900 relative overflow-hidden flex flex-col items-center justify-between'>
      <NavBar/>
      <div className="w-420 h-175 mb-5 bg-slate-800 p-6 flex flex-col items-center text-white font-poppins rounded-lg overflow-y-auto">
        <div className='w-400 h-15 flex flex-row items-center justify-start'>
            <div className='w-50 h-10 flex flex-row items-center justify-center'>
                <input placeholder='Search Items' type="text"  value={searchValue} onChange={updateValue} className='w-40 p-5 h-10 rounded-s-xl bg-white text-slate-800 font-poppins'/>
                <button onClick={()=>searchPurchaseItem(searchValue)} className='w-10 h-10 rounded-e-xl bg-violet-600 text-white'>
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
            </div>
        </div>
        <table className="table-auto w-400 text-left border border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-violet-600 text-white">
                <tr>
                <th className="py-3 px-4 border-b border-violet-500">Purchase No</th>
                <th className="py-3 px-4 border-b border-violet-500">Date</th>
                <th className="py-3 px-4 border-b border-violet-500">Customer</th>
                <th className="py-3 px-4 border-b border-violet-500">Payment Method</th>
                <th className="py-3 px-4 border-b border-violet-500">Product</th>
                <th className="py-3 px-4 border-b border-violet-500">Status</th>
                <th className="py-3 px-4 border-b border-violet-500">Quantity</th>
                <th className="py-3 px-4 border-b border-violet-500">Unit Price</th>
                </tr>
            </thead>
            <tbody>
                {purchasedItems.map((p, index) => (
                <tr key={index} className="hover:bg-slate-700 transition">
                    <td className="py-3 px-4 border-b border-slate-700">{index + 1}</td>
                    <td className="py-3 px-4 border-b border-slate-700">{p?.date}</td>
                    <td className="py-3 px-4 border-b border-slate-700">{p?.customerName}</td>
                    <td className="py-3 px-4 border-b border-slate-700">{p?.paymentMethod}</td>
                    <td className="py-3 px-4 border-b border-slate-700">{p?.productName}</td>
                    <td className="py-3 px-4 border-b border-slate-700">{p?.status}</td>
                    <td className="py-3 px-4 border-b border-slate-700">{p?.quantity}</td>
                    <td className="py-3 px-4 border-b border-slate-700">{p?.unitPrice}</td>
                </tr>
                ))}
            </tbody>
            </table>
      </div>
    </div>
  )
}

export default History
