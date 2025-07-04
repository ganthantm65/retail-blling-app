import { faUser, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const navigate = useNavigate();
  const [passwordVisible, setPassworVisible] = useState(false);

  const updateUserName = (event) => {
    setUserName(event.target.value);
  }

  const updatePassWord = (event) => {
    setPassWord(event.target.value);
  }

  const validateData = () => {
    const user = { "adminName": userName, "passWord": password };
    fetchData(user);
  }

  const fetchData = (userData) => {
    const body = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }

    try {
      const request = fetch("http://localhost:8080/auth/login", body);
      request.then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      }).then((data) => {
        if (data) {
          localStorage.setItem("Token", data.token);
          localStorage.setItem("userName", userName);
          navigate("/dashboard", { state: { userName: userName } });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-screen h-screen bg-slate-900 relative overflow-hidden'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 w-96 h-100 shadow-lg rounded-lg bg-slate-800 flex flex-col items-center justify-baseline gap-5'>
        <h1 className='text-3xl text-gray-100 font-poppins'>Admin Login</h1>

        <div className='w-80 h-10 bg-slate-600 rounded-lg p-5 text-white flex flex-row items-center justify-between'>
          <h1>
            <FontAwesomeIcon icon={faUser} />
          </h1>
          <input
            type="text"
            value={userName}
            placeholder='Enter Admin name'
            onChange={updateUserName}
            className='bg-slate-600 rounded-lg w-70 h-10 p-5 text-white outline-none focus:ring-0 focus:outline-none'
          />
        </div>

        <div className='w-80 h-10 bg-slate-600 rounded-lg p-5 text-white flex flex-row items-center justify-between'>
          <h1>
            <FontAwesomeIcon icon={faLock} />
          </h1>
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            placeholder='Enter Password'
            onChange={updatePassWord}
            className='bg-slate-600 rounded-lg w-70 h-10 p-5 text-white outline-none focus:ring-0 focus:outline-none'
          />
          <button onClick={()=>{
            setPassworVisible(!passwordVisible)
          }}>
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash:faEye}/>
          </button>
        </div>

        <p><a className='text-sm text-white cursor-pointer'>forgot password?</a></p>

        <button
          className='bg-violet-600 text-white rounded-lg w-80 h-10'
          onClick={validateData}
        >Login</button>
      </div>
    </div>
  )
}

export default Login;
