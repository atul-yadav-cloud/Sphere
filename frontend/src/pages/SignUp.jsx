import React, { useState } from 'react'
import logo from "../assets/logop.png"
import logo1 from "../assets/sidelogo.png"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios"
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function SignUp() {
const [inputClicked,setInputClicked]=useState({
    name:false,
    userName:false,
    email:false,
    password:false
})
const [showPassword,setShowPassword]=useState(false)
const [loading,setLoading]=useState(false)
const [name,setName]=useState("")
const [userName,setUserName]=useState("")
const [err,setErr]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate=useNavigate()
const dispatch=useDispatch()

    {/* Mail id kuchh bhi accept kar le rha tha */}
  
 {/*const handleSignUp=async ()=>{
  setLoading(true)
  setErr("")

  try {
    const result=await axios.post(`${serverUrl}/api/auth/signup`,{name,userName,email,password},{withCredentials:true})
    dispatch(setUserData(result.data))
    setLoading(false)
  } catch (error) {
    setErr(error.response?.data?.message)
    console.log(error)
    setLoading(false)
  }
}*/}

      const handleSignUp = async () => {
        // 1. Email format check karne ke liye Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 2. Pehle check karega ki koi field khali to nahi hai
        if (!name || !userName || !email || !password) {
          return setErr("All fields are required");
        }

        // Username space validation
        if (userName.includes(" ")) {
          return setErr("Username should not contain spaces");
        }

        // 3. Phir check karega ki email ka format sahi hai ya nahi
        if (!emailRegex.test(email)) {
          return setErr("Please enter a valid email address");
        }

        setLoading(true);
        setErr("");

        try {
          const result = await axios.post(`${serverUrl}/api/auth/signup`, { name, userName, email, password }, { withCredentials: true });
          dispatch(setUserData(result.data));
          setLoading(false);
          // Agar aap chahte hain ki signup ke baad home page par jaye:
          // navigate("/") 
        } catch (error) {
          setErr(error.response?.data?.message || "Something went wrong");
          console.log(error);
          setLoading(false);
        }
      };


  return (
    <div className='w-full h-screen bg-gray-100 flex flex-col justify-center items-center'>
      <div className='w-[90%] lg:max-w-[60%]  h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-0 border-[#1a1f23]'>
<div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]'>

<div className='flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]'>
    <span>Sign Up to </span>
    <img src={logo} alt="" className='w-[50px] -ml-3'/>
</div>

                                    {/* Name enter karne ke liye*/}

<div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black' onClick={()=>setInputClicked({...inputClicked,name:true})}>
    <label htmlFor='name' className={`text-gray-700 absolute cursor-text left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.name?"top-[-15px]":""}`}> Enter Your Name</label>
        <input type="text" id='name' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e)=>setName(e.target.value)} value={name}/>
    
</div>

                                    {/* UserName enter karne ke liye*/}

<div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black' onClick={()=>setInputClicked({...inputClicked,userName:true})}>
    <label htmlFor='userName' className={`text-gray-700 absolute cursor-text left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.userName?"top-[-15px]":""}`}> Enter Username</label>
         <input type="text" id='userName' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e)=>setUserName(e.target.value)} value={userName}/>
    
</div>

                                    {/* Email enter karne ke liye*/}

<div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black' onClick={()=>setInputClicked({...inputClicked,email:true})}>
    <label htmlFor='email' className={`text-gray-700 absolute cursor-text left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email?"top-[-15px]":""}`}> Enter Email</label>
        <input type="email" id='email' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
    
</div>
                                    {/* Password enter karne ke liye*/}

<div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black' onClick={()=>setInputClicked({...inputClicked,password:true})}>
    <label htmlFor='password' className={`text-gray-700 absolute cursor-text left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.password?"top-[-15px]":""}`}> Enter password</label>
        <input type={showPassword?"text":"password"} id='password' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
        {!showPassword?<IoIosEye className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={()=>setShowPassword(true)}/>:<IoIosEyeOff className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={()=>setShowPassword(false)}/>} 
</div>
{err && <p className='text-red-500'>{err}</p>}

                                    {/* SIGN UP BUTTON ke liye*/}


<button className='w-[70%] px-[20px] py-[10px] bg-gradient-to-b from-blue-500 to-blue-700 transition-transform hover:scale-102 duration-300  text-white shadow font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleSignUp} disabled={loading}>{loading?<ClipLoader size={30} color='white'/>:"Sign Up"}</button>
<p className='cursor-pointer  text-gray-800' onClick={()=>navigate("/signin")}>Already Have An Account? <span className='border-b-2 border-b-black pb-[3px] text-black'>Sign In</span></p>
</div>
<div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-blue-600 flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'>

<img src={logo1} alt="" className='w-[60%]'/>
<p className='font-semibold '>Make endless serured connections!</p>
</div>
      </div>
    </div>
  )
}

export default SignUp
