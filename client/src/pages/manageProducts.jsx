import React, { useEffect, useState } from 'react'
import JwtValidator from '../components/JwtValidator'
import NavBar from '../components/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ManageProducts = () => {
  const [visiblity,setVisiblity]=useState();
  const [categories,setCategories]=useState([]);
  const [product_name,setProductName]=useState();
  const [product_price,setProductPrice]=useState();
  const [category_no,setCategory]=useState(); 
  const [description,setDescription]=useState();
  const [stock,setStock]=useState();
  const [imageUrl,setImageUrl]=useState();
  const updateProductName=(e)=>{
    setProductName(e.target.value);
  }
  const updateProductPrice=(e)=>{
    setProductPrice(e.target.value);  
  }
  const updateCategory=(e)=>{
    setCategory(e.target.value);
  }
  const updateDescription=(e)=>{
    setDescription(e.target.value);
  }
  const updateImageUrl=(e)=>{
    setImageUrl(e.target.value)
  }
  const updateVisisblity=()=>{
    setVisiblity(!visiblity);
  }
  const updateStock=(e)=>{
    setStock(e.target.value); 
  }
  const addProducts=async(e)=>{
    e.preventDefault();
    const product={
      product_name,
      price:Number(product_price),
      category_no:{
        id:Number(category_no.slice(0,1))
      },
      description,
      imageUrl,
      stock:Number(stock)
    }    
    const url=`http://localhost:8080/api/addProducts`;
    const options={
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem('Token')}`
      },
      body:JSON.stringify(product)
    }
    try {
      const response=await fetch(url,options);
      const data=await response.text();
      console.log(data);
      setCategory("");
      setDescription("");
      setImageUrl("");
      setProductName("");
      setProductPrice("");
      setStock("");
    } catch (error) {
      console.log("Error in adding products:", error);
    }
  }
  useEffect(()=>{
    const fetchCategories=async()=>{
      const url=`http://localhost:8080/api/categories/names`
      const options={
        method:"GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem('Token')}`,
          "Content-Type":"application/json"
        }
      }
      console.log(options);
      
      try {
        const response=await fetch(url,options);

        if (!response.ok) {
          throw new Error("Error in fetching categories!")
        }
        
        const data=await response.json()
        console.log(data);
        setCategories(data);
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories();
  },[])
  
  useEffect(()=>{
    if(JwtValidator(localStorage.getItem("Token"))){
      localStorage.clear();
      window.location.href='/';
    }
  },[])
  return (
    <div className='w-screen h-screen bg-slate-900 relative overflow-hidden flex flex-col items-center justify-between'>
      <NavBar/>
      <div className='w-420 h-180 flex flex-col items-start justify-center font-poppins bg-slate-800 text-white rounded-lg shadow-lg p-10 my-5'>
        <div className='w-full h-10 flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center justify-center '>
            <input type="text" placeholder='Search products' className='bg-white rounded-s-xl shadow-lg text-black h-10 mb-2 p-1'/>
            <button><FontAwesomeIcon icon={faSearch} className='bg-violet-600 rounded-e-xl shadow-lg h-10 p-3 mb-1'/></button>
          </div> 
          <button className='bg-violet-600 rounded-lg shadow-lg p-3 text-white' onClick={updateVisisblity}>Add Products</button>
        </div>
        {
          visiblity ?(
            <div className='position-absolute top-1/2 left-1/2 z-5 w-150 h-180 bg-violet-800 rounded-lg shadow-lg flex flex-col items-baseline justify-evenly gap-5 p-10 ml-10'>
              <h1 className='text-2xl text-white font-bold'>Add Products</h1>
              <form className='w-full h-full flex flex-col items-start justify-evenly'>
                  <label>Product Name</label>
                  <input type="text" value={product_name} onChange={updateProductName} placeholder='Eg.Samsung S23' className='w-86 h-10 p-5 bg-white shadow-lg rounded-lg text-black' required/>
                  <label>Product Price</label>
                  <input type="number" value={product_price} onChange={updateProductPrice} placeholder='Eg. 1000' className='w-86 h-10 p-5 bg-white shadow-lg rounded-lg text-black' required/>
                  <label>Category</label>
                  {
                    categories.length>0 ? (
                      <select value={category_no} onChange={updateCategory} className='w-86 h-10 p-5 bg-white shadow-lg rounded-lg text-black' required>
                        <option value="" disabled selected>Select a category</option>
                        {
                          categories.map((category, index) => (
                            <option key={index} value={category}>{category[0]} {category[1]}</option>
                          ))
                        }
                      </select>
                    ) : (
                      <p className='text-red-500'>No categories available</p>
                    )
                  }
                  <label>Description</label>
                  <textarea value={description} onChange={updateDescription} placeholder='Eg.Samsung S23 is a flagship smartphone with...' className='w-86 h-20 p-5 bg-white shadow-lg rounded-lg text-black' required></textarea>
                  <label>Image URL</label>
                  <input value={imageUrl} onChange={updateImageUrl} type="url" placeholder='Eg. http://example.com/image.png' className='w-86 h-10 p-5 bg-white shadow-lg rounded-lg text-black' required/>
                  <label>Stocks</label>
                  <input value={stock} onChange={updateStock} type="text" placeholder='Eg.10' className='w-86 h-10 p-5 bg-white shadow-lg rounded-lg text-black'/>
                  <button onClick={addProducts} className='w-86 h-10 px-5 bg-slate-900 shadow-lg rounded-lg text-white'>Add products</button>
              </form>
          </div>
          ):null
        }
      </div>
    </div>
  )
}

export default ManageProducts
