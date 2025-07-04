import React, { useEffect, useState } from 'react'
import JwtValidator from '../components/JwtValidator'
import NavBar from '../components/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MessageBox from '../components/MessageBox';
import ProductCard from '../components/ProductCard';

const ManageProducts = () => {
  const [visiblity,setVisiblity]=useState();
  const [categories,setCategories]=useState([]);
  const [product_name,setProductName]=useState();
  const [product_price,setProductPrice]=useState();
  const [category_no,setCategory]=useState(); 
  const [description,setDescription]=useState();
  const [stock,setStock]=useState();
  const [color,setColor]=useState("");
  const [showMessage,setShowMessage]=useState(false);
  const [message,setMessage]=useState("");
  const [productList,setProductList]=useState([]);
  const [imageUrl,setImageUrl]=useState();
  const [searchValue,setSearchValue]=useState('');

  localStorage.setItem("Products",JSON.stringify(productList))

  const products=JSON.parse(localStorage.getItem("Products")|| "[]");

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
  const updateSearchValue=(e)=>{
    setSearchValue(e.target.value)
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
        id:Number(category_no.split(/[^a-zA-Z0-9]+/)[0])
      },
      description,
      imageUrl,
      stock:Number(stock)
    }        
    console.log(product);
    
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
      if(!response.ok){
        throw new Error("Error in adding product!");
      }
      const data=await response.json();
      setProductList(prev => [...prev, data]);
      setShowMessage(true);
      setMessage("Product added successfully!");
      setColor('bg-green-600')
      setCategory("");
      setDescription("");
      setImageUrl("");
      setProductName("");
      setProductPrice("");
      setStock("");

    } catch (error) {
      setShowMessage(true);
      setMessage(error.message);
      setColor("bg-red-500");      
    }
  }
  const searchProducts=async()=>{
    const searchValueLower=searchValue.trim().toLowerCase();
    const categoryNames=categories.map(category => category[1].trim().toLowerCase())
    const isIncluded=categoryNames.includes(searchValueLower);
    const encodedValue = encodeURIComponent(searchValueLower);
    
    const url=isIncluded?`http://localhost:8080/api/getCategory/${encodedValue}`:`http://localhost:8080/api/getProducts/${encodedValue}`;
    console.log(url);
    
    const options={
      method:"GET",
      headers:{
        Authorization:`Bearer ${localStorage.getItem('Token')}`,
        "Content-Type":"application/json"
      }
    }
    try{
      const response=await fetch(url,options);
      if(!response.ok){
        throw new Error("Error in fetching products!");
      }
      const data=await response.json();
      if(data.length === 0){
        setShowMessage(true);
        setMessage("No products found!");
        setColor("bg-red-500");
      }
      setProductList(data)      
    }catch(error){
      setShowMessage(true);
      setMessage(error.message);
      setColor("bg-red-500");
    }
  }
  const fetchProducts=async()=>{
      const url=`http://localhost:8080/api/getProducts`;
      const options={
        method:"GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem('Token')}`,
          "Content-Type":"application/json"
        }
      }
      try{
        const response=await fetch(url,options);
        if(!response.ok){
          throw new Error(response.statusText);
        }
        const data=await response.json();
        setProductList(data);     
      }catch(error){
        setShowMessage(true);
        setMessage(error.message);
        setColor("bg-red-500");
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
      
      try {
        const response=await fetch(url,options);

        if (!response.ok) {
          throw new Error("Error in fetching categories!")
        }
        
        const data=await response.json()
        setCategories(data);
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories();
  },[])
  
  useEffect(()=>{
    if (searchValue!="") {
      searchProducts();
    }else{
      fetchProducts();
    }
  },[searchValue])

  useEffect(()=>{
    if(JwtValidator(localStorage.getItem("Token"))){
      localStorage.clear();
      window.location.href='/auth/login';
    }
  },[])

  useEffect(()=>{
    fetchProducts();
  },[])

  return (
        <div className='w-screen h-screen bg-slate-900 relative overflow-hidden flex flex-col items-center justify-between'>
            <NavBar />
            {showMessage ? (
              <MessageBox message={message} color={color} />
            ) : null}

            <div className='w-full h-180 flex flex-col items-center justify-center font-poppins bg-slate-800 text-white rounded-lg shadow-lg p-5 my-2'>
              <div className='w-385 flex flex-col lg:flex-row items-center justify-between mb-4 '>
                <div className='flex flex-row items-center justify-center w-full lg:w-auto'>
                  <input
                    type='text'
                    value={searchValue}
                    placeholder='Search products'
                    onChange={updateSearchValue}
                    className='bg-white rounded-s-xl shadow-lg text-black h-10 p-2 w-full lg:w-72'
                  />
                  <button onClick={searchProducts} className='bg-violet-600 rounded-s-none rounded-e-xl shadow-lg h-10 p-2'>
                    <FontAwesomeIcon
                      icon={faSearch}
                    />
                  </button>
                </div>
                <button
                  className='bg-violet-600 rounded-lg shadow-lg px-4 py-2 text-white'
                  onClick={updateVisisblity}
                >
                  Add Products
                </button>
              </div>

              <div className='flex flex-row flex-wrap items-baseline justify-evenly gap-5 w-full h-full max-h-[80vh] overflow-y-auto'>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <ProductCard product={product} index={index} />
                  ))
                ) : (
                  <p className='text-red-500'>No products available</p>
                )}
              </div>
            </div>

            {visiblity ? (
              <div className='absolute top-20 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-3xl bg-violet-800 rounded-lg shadow-lg flex flex-col items-start justify-evenly gap-5 p-8'>
                <h1 className='text-2xl text-white font-bold'>Add Products</h1>
                <form className='w-full flex flex-col items-start gap-4'>
                  <div className='w-full'>
                    <label className='text-white'>Product Name</label>
                    <input
                      type='text'
                      value={product_name}
                      onChange={updateProductName}
                      placeholder='Eg.Samsung S23'
                      className='w-full h-10 px-4 bg-white shadow-lg rounded-lg text-black'
                      required
                    />
                  </div>

                  <div className='flex flex-col lg:flex-row gap-5 w-full'>
                    <div className='flex flex-col flex-1'>
                      <label className='text-white'>Product Price</label>
                      <input
                        type='number'
                        value={product_price}
                        onChange={updateProductPrice}
                        placeholder='Eg. 1000'
                        className='h-10 px-4 bg-white shadow-lg rounded-lg text-black'
                        required
                      />
                    </div>
                    <div className='flex flex-col flex-1'>
                      <label className='text-white'>Category</label>
                      {categories.length > 0 ? (
                        <select
                          value={category_no}
                          onChange={updateCategory}
                          className='h-10 px-4 bg-white shadow-lg rounded-lg text-black'
                          required
                        >
                          <option value='' disabled>
                            Select a category
                          </option>
                          {categories.map((category, index) => (
                            <option key={index} value={category}>
                              {category[0]} {category[1]}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className='text-red-500'>No categories available</p>
                      )}
                    </div>
                  </div>

                  <div className='w-full'>
                    <label className='text-white'>Description</label>
                    <textarea
                      value={description}
                      onChange={updateDescription}
                      placeholder='Eg.Samsung S23 is a flagship smartphone with...'
                      className='w-full h-20 px-4 py-2 bg-white shadow-lg rounded-lg text-black'
                      required
                    ></textarea>
                  </div>

                  <div className='w-full'>
                    <label className='text-white'>Image URL</label>
                    <input
                      value={imageUrl}
                      onChange={updateImageUrl}
                      type='url'
                      placeholder='Eg. http://example.com/image.png'
                      className='w-full h-10 px-4 bg-white shadow-lg rounded-lg text-black'
                      required
                    />
                  </div>

                  <div className='w-full'>
                    <label className='text-white'>Stocks</label>
                    <input
                      value={stock}
                      onChange={updateStock}
                      type='text'
                      placeholder='Eg.10'
                      className='w-full h-10 px-4 bg-white shadow-lg rounded-lg text-black'
                    />
                  </div>

                  <button
                    onClick={addProducts}
                    className='w-full h-10 px-5 bg-slate-900 shadow-lg rounded-lg text-white cursor-pointer'
                  >
                    Add products
                  </button>
                </form>
              </div>
            ) : null}
          </div>
  )
}

export default ManageProducts
