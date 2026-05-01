import React from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dp from "../assets/dp.webp"
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { setProfileData, setUserData } from '../redux/userSlice';
import { ClipLoader } from 'react-spinners';
function EditProfile() {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const imageInput = useRef()
    const [frontendImage, setFrontendImage] = useState(userData.profileImage || dp)
    const [backendImage, setBackendImage] = useState(null)
    const [name, setName] = useState(userData.name || "")
    const [userName, setUserName] = useState(userData.userName || "")
    const [bio, setBio] = useState(userData.bio || "")
    const [profession, setProfession] = useState(userData.profession || "")
    const [gender, setGender] = useState(userData.gender || "")
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)
    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleEditProfile=async ()=>{
        setLoading(true)
        try {
            const formdata=new FormData()
            formdata.append("name",name)
            formdata.append("userName",userName)
             formdata.append("bio",bio)
              formdata.append("profession",profession)
               formdata.append("gender",gender)
               if(backendImage){
                formdata.append("profileImage",backendImage)
               }
            const result=await axios.post(`${serverUrl}/api/user/editProfile`,formdata,{withCredentials:true})
            dispatch(setProfileData(result.data))
            dispatch(setUserData(result.data))
            setLoading(false)
            navigate(`/profile/${userData.userName}`)
        } catch (error) {
           console.log(error) 
            setLoading(false)
        }
    }

    return (
        <div className='w-full min-h-[100vh] bg-gray-100 flex items-center flex-col gap-[20px] '>
            <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px]'>
                <MdOutlineKeyboardBackspace className='text-black cursor-pointer w-[25px]  h-[25px] ' onClick={() => navigate(`/profile/${userData.userName}`)} />
                <h1 className='text-black text-[20px] font-semibold'>Edit Profile</h1>
            </div>
            <div className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={() => imageInput.current.click()}>
                <input type='file' accept='image/*' ref={imageInput} hidden onChange={handleImage} />
                <img src={frontendImage} alt="" className='w-full object-cover' />
            </div>

            <div className='text-gray-900 text-center text-[18px] font-semibold cursor-pointer' onClick={() => imageInput.current.click()}>Choose Profile Picture</div>

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-gray-50 border-2 border-gray-600 rounded-2xl text-gray-900 font-semibold px-[20px] outline-none ' placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)} value={name}/>
            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-gray-50 border-2 border-gray-600 rounded-2xl text-gray-900 font-semibold px-[20px] outline-none ' placeholder='Enter Your userName' onChange={(e)=>setUserName(e.target.value)} value={userName}/>
            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-gray-50 border-2 border-gray-600 rounded-2xl text-gray-900 font-semibold px-[20px] outline-none ' placeholder='Bio' onChange={(e)=>setBio(e.target.value)} value={bio}/>
            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-gray-50 border-2 border-gray-600 rounded-2xl text-gray-900 font-semibold px-[20px] outline-none ' placeholder='Profession' onChange={(e)=>setProfession(e.target.value)} value={profession}/>
            <select className='w-[90%] max-w-[600px] h-[60px] bg-gray-50 border-2 border-gray-600 rounded-2xl text-gray-900 font-semibold px-[20px] outline-none cursor-pointer' onChange={(e) => setGender(e.target.value)} value={gender}>
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option></select>

            <button className='px-[10px] w-[90%] max-w-[600px] text-white py-[5px] h-[50px] bg-gradient-to-b from-blue-600 to-blue-700 cursor-pointer transition-transform hover:scale-98 duration-300 font-semibold shadow rounded-2xl' onClick={handleEditProfile}>{loading?<ClipLoader size={30} color='white'/>:"Save Profile"}</button>
        <div>

        </div>
        
        
        </div>
    )
}

export default EditProfile
