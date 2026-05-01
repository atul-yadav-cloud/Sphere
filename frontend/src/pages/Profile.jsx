import axios from 'axios'
import React from 'react'
import { serverUrl } from '../App'
import { UNSAFE_createClientRoutesWithHMRRevalidationOptOut, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData } from '../redux/userSlice'
import { useEffect } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.webp"
import Nav from '../components/Nav'
import FollowButton from '../components/FollowButton'
import Post from '../components/Post'
import { useState } from 'react'
import { setSelectedUser } from '../redux/messageSlice'

function Profile() {

    const { userName } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [postType,setPostType]=useState("posts")
    const { profileData, userData } = useSelector(state => state.user)
    const { postData } = useSelector(state => state.post)
    const handleProfile = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/getProfile/${userName}`, { withCredentials: true })
            dispatch(setProfileData(result.data))
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleProfile()
    }, [userName, dispatch])
    return (
        <div className='w-full min-h-screen bg-gray-50'>
            <div className='w-full h-[80px] flex justify-between items-center px-[30px] text-black'>
                <div onClick={() => navigate("/")}><MdOutlineKeyboardBackspace className='text-black cursor-pointer w-[25px]  h-[25px] ' /></div>
                <div className='font-semibold text-black text-[20px]'>{profileData?.userName}</div>
                <div className='font-semibold cursor-pointer text-[20px] text-blue-500 ' onClick={handleLogOut}>Log Out</div>
            </div>

            <div className='w-full h-[150px] flex items-start  gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center'>

                <div className='w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                    <img src={profileData?.profileImage || dp} alt="" className='w-full object-cover' />
                </div>

                        {/* Profile.js ka wo section jahan details hain */}
                <div >
                    <div className='font-semibold text-[22px] text-black'>{profileData?.name}</div>
                         
                        {/* YAHAN GENDER show karne ke liye */}
                        {profileData?.gender && (
                        <div className='text-[15px] text-gray-400 font-medium lowercase first-letter:uppercase'> {profileData?.gender}
                        </div>
                        )}

                        {/* Profession dikhane ke liye */}
                    <div className='text-[17px] text-[black]'>{profileData?.profession || "New User"}</div>

                        {/* Bio dikhane ke liye */}
                    <div className='text-[17px] text-[black]'>{profileData?.bio}</div>
                </div>
            </div>

            <div className='w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white'>
                <div>
                    <div className='text-black text-[22px] text-center md:text-[30px] font-semibold'>{profileData?.posts.length}</div>
                    <div className='text-[18px] md:text-[22px] text-[black]'>Posts</div>
                </div>
                <div>
                    <div className='flex items-center justify-center gap-[20px]'>
                        <div className='flex relative'>
                            {profileData?.followers?.slice(0, 2).map((user, index) => (

                                <div className={`w-[30px] h-[30px] border-2 border-black rounded-full cursor-pointer overflow-hidden ${index>0?`absolute left-[${index*10}px]`:""}`}>
                                    <img src={user.profileImage || dp} alt="" className='w-full object-cover' />
                                </div>
                            ))}


                        </div>
                        <div className='text-black text-[22px] text-center md:text-[30px] font-semibold'>
                            {profileData?.followers.length}
                        </div>
                    </div>
                    <div className='text-[18px] md:text-[22px] text-[black]'>Followers</div>
                </div>
                <div>
                    <div className='flex items-center justify-center gap-[20px]'>
                        <div className='flex relative'>

                             {profileData?.following?.slice(0, 2).map((user, index) => (
                               

                                <div className={`w-[30px] h-[30px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${index>0?`absolute left-[${index*10}px]`:""}`}>
                                    <img src={user?.profileImage || dp} alt="" className='w-full object-cover' />
                                </div>
                            ))}

                        </div>
                        <div className='text-black text-[22px] text-center md:text-[30px] font-semibold'>
                            {profileData?.following.length}
                        </div>
                    </div>
                    <div className='text-[18px] md:text-[22px] text-[black]'>Following</div>
                </div>
            </div>

            <div className='w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]'>
                {profileData?._id == userData._id
                    &&
                    <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] hover:scale-98 transition-transform duration-100 border-1 shadow bg-white cursor-pointer rounded-2xl' onClick={() => navigate("/editprofile")}>Edit Profile</button>}

                {profileData?._id != userData._id
                    &&
                    <>

                        <FollowButton tailwind={'px-[10px] min-w-[150px] py-[5px] h-[40px] text-white bg-blue-600 shadow border-0 cursor-pointer rounded-2xl'} targetUserId={profileData?._id} onFollowChange={handleProfile} />
                        <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] border-1 bg-white cursor-pointer rounded-2xl' onClick={()=>{
                            dispatch(setSelectedUser(profileData))
                            navigate("/messageArea")
                        }}>Message</button>
                    </>
                }
            </div>

            <div className='w-full min-h-[100vh]  flex justify-center'>
                <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-gray-100 relative gap-[20px] pt-[30px] pb-[100px]'>
                    {profileData?._id==userData._id && <div className='w-[90%] max-w-[500px] h-[80px] bg-white shadow rounded-full flex justify-center items-center gap-[10px]' >

                <div className={`${postType == "posts" ? "bg-blue-600 text-white shadow-2xl shadow-black" : ""}  w-[25%] h-[60%] flex justify-center items-center text-[19px] font-semibold hover:bg-blue-700 rounded-full hover:text-white cursor-pointer hover:shadow hover:shadow-black`} onClick={() => setPostType("posts")}>Posts</div>

                <div className={`${postType == "saved" ? "bg-blue-600 text-white shadow-2xl shadow-black" : ""}  w-[25%] h-[60%] flex justify-center items-center text-[19px] font-semibold hover:bg-blue-700 rounded-full hover:text-white cursor-pointer hover:shadow hover:shadow-black`} onClick={() => setPostType("saved")}>Saved</div>

             </div>}

                    <Nav />

{profileData?._id==userData._id && <>
                  {/* { postType=="posts" && postData.map((post,index)=>(
                     post.author?._id==profileData?._id && <Post post={post}/> ))} */}
                      
                      {/* Apni profile me post dekhne ke liye */}

                  {postType=="posts" && (
                  <div className='w-full grid grid-cols-3 gap-[2px] mt-[20px]'>
                  {postData.filter(post=>post.author?._id ===profileData?._id)
                  .map((post,index)=>(
                  <div key={index} className='w-full aspect-[9/13] overflow-hidden'>
                  <img src={post.media} className='w-full h-full rounded-2xl cursor-pointer shadow object-cover hover:scale-98 transition-transform duration-200'/> </div>
                  ))} </div> )}

                   {/* {postType=="saved" && postData.map((post,index)=>(
                   userData.saved.includes(post._id) && <Post post={post}/> ))} */}
{postType=="saved" && (

                        // Apni profile me saved post dekhne ke liye 

                  <div className='w-full grid grid-cols-3 gap-[2px] mt-[20px]'>
                  {postData.filter(post =>userData.saved.includes(post._id))
                  .map((post,index)=>(
                  <div key={index} className='w-full aspect-[9/13] overflow-hidden object-center '>
                  <img src={post.media} className='w-full h-full rounded-2xl cursor-pointer shadow object-cover hover:scale-98 transition-transform duration-200 '/></div>
                  ))}</div> )}
</> 
}
{profileData?._id!=userData._id &&
                  // postData.map((post,index)=>(
                  //  post.author?._id==profileData?._id && <Post post={post}/> )) 
                  <div className='w-full grid grid-cols-3 gap-[2px] mt-[20px]'>
                  {postData.filter(post =>post.author?._id === profileData?._id)
                  .map((post,index)=>(
                  <div key={index} className='w-full aspect-[9/13] overflow-hidden'>
                  <img src={post.media} className='w-full h-full rounded-2xl cursor-pointer shadow object-cover hover:scale-98 transition-transform duration-200 '/></div>
                  ))}</div>
}
                    
                </div>
            </div>
        </div>
    )
}

export default Profile
