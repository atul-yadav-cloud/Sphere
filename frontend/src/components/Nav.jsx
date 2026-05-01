import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import dp from "../assets/dp.webp"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Nav() {
  const navigate=useNavigate()
  const {userData}=useSelector(state=>state.user)
  return (
                         // ye property use kar rahu hu backdrop-blur-md , iski jagah line 15 me- transition-transform hover:scale-102 duration-300
    <div className='w-[90%] lg:w-[40%] h-[80px] backdrop-blur-sm border-t border-white/20 flex justify-around items-center fixed bottom-[20px] rounded-full shadow shadow-[#000000] z-[100]'>
     <div onClick={()=>navigate("/")}><GoHomeFill className='text-black cursor-pointer w-[25px] h-[25px]'/></div>
     <div onClick={()=>navigate("/search")}><FiSearch className='text-black cursor-pointer w-[25px] h-[25px]'/></div>
     <div className='flex flex-col items-center justify-center cursor-pointer' onClick={()=>navigate("/upload")}><FiPlusSquare className='text-black cursor-pointer w-[25px] h-[25px]'/>Upload</div>
     <div onClick={()=>navigate("/loops")}><RxVideo className='text-black cursor-pointer w-[25px] h-[25px]'/></div>
     <div className='w-[35px] h-[35px] border-2 border-black rounded-full cursor-pointer overflow-hidden ' onClick={()=>navigate(`/profile/${userData.userName}`)}>
        <img src={userData.profileImage || dp} alt="" className='w-full object-cover'/>
     </div>
     </div>
  )
}

export default Nav
