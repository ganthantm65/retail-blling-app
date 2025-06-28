import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import MessageBox from '../components/MessageBox';
import BannerCard from '../components/BannerCard';
import JwtValidator from '../components/JwtValidator';

const ManageCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [showMessage,setShowMessage]=useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories,setCategories]=useState([]);

  const updateCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const updateImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const url = `http://localhost:8080/api/categories`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCategories();
  }, []);
  const addCategory = async (e) => {
    e.preventDefault(); 

    const category = {
      categoryName,
      imageUrl,
    };

    const token = localStorage.getItem("Token");
    console.log("Token:", token); 

    try {
      const response = await fetch("http://localhost:8080/api/addCategory", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Category added:", data);
      setShowMessage(true);
      setMessage("Category added successfully!");
      setColor('bg-green-600')
      setCategoryName("")
      setImageUrl("")
    } catch (error) {
      console.error("Error:", error);
      setShowMessage(true);
      setMessage("Failed to add!");
      setColor('bg-red-600')
      setCategoryName("")
      setImageUrl("")
    }
  };

  useEffect(()=>{
    if(JwtValidator(localStorage.getItem("Token"))){
      localStorage.clear();
      window.location.href='/';
    }
  },[])
  return (
    <div className="w-screen h-screen bg-slate-900 relative overflow-hidden flex flex-col items-center justify-between font-family-poppins">
      <NavBar />
      {
        showMessage ?(
          <MessageBox message={message} color={color}/>
        ):null
      }
      <div className="w-full h-full flex flex-row items-center justify-center">
        <div className="w-310 h-180 bg-slate-800 font-poppins rounded-lg shadow-lg flex flex-row flex-wrap items-baseline justify-around gap-5 p-10 overflow-y-auto">
          {
            categories.length>0?(
              categories.map((category,index)=>{
                return(
                  <BannerCard imageUrl={category.imageUrl} categoryName={category.categoryName} index={index} />
                )
              })
            ):(
              <h1 className='text-2xl text-white font-bold'>No Categories Found</h1>
            )
          }
        </div>
        <div className="w-100 h-180 bg-violet-800 rounded-lg shadow-lg flex flex-col items-baseline justify-evenly gap-5 p-10 ml-10">
          <h1 className="text-3xl text-white font-extrabold font-poppins">Add Category</h1>
          <form
            className="flex flex-col items-baseline justify-baseline gap-5 w-full h-full font-poppins"
            onSubmit={addCategory}
          >
            <label className="text-lg text-white">Category Name</label>
            <input
              type="text"
              value={categoryName}
              placeholder="Eg. Grocery"
              onChange={updateCategoryName}
              className="bg-white shadow-lg rounded-lg w-86 h-10 p-5"
              required
            />

            <label className="text-lg text-white">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              placeholder="Eg. http://example.com/image.png"
              onChange={updateImageUrl}
              className="bg-white shadow-lg rounded-lg w-86 h-20 p-5"
              required
            />

            <button
              type="submit"
              className="bg-slate-900 shadow-lg rounded-lg w-86 h-20 p-5 text-white cursor-pointer"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
