import React from 'react'
import dp from "../assets/dp.webp"
import { useNavigate } from 'react-router-dom'  // {/*Import useNavigate */}
function NotificationCard({ noti }) {
  const navigate = useNavigate()                // Initialize navigate 

  {/*Profile par jane ka function */}

  const goToProfile = (e) => {
    e.stopPropagation()                          // Isse parent div ka click trigger nahi hoga
    if (noti.sender?.userName) {
    navigate(`/profile/${noti.sender.userName}`)
  } else {
        console.error("Username not found in notification data")
    }
  }

  return (
    <div className='w-full flex justify-between items-center cursor-pointer p-[5px] min-h-[50px] bg-gray-200 rounded-full'>
            {/* Is div par click karne se user ki profile khulegi */}
      <div className='flex gap-[10px] items-center' onClick={goToProfile}>
        <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
          <img src={noti.sender?.profileImage || dp} alt="" className='w-full object-cover' />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-[16px] text-black font-semibold'>{noti.sender?.userName}</h1>
          <div className='text-[15px] text-gray-600 first-letter:uppercase'>{noti.message}</div>
        </div>
      </div>

                {/* Post wali image/video (Ispe click karne se post khulni chahiye*/}
      <div className='w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-black ml-2'>
        {noti.loop
          ? <video src={noti?.loop?.media} muted className='h-full w-full object-cover' />
          : noti.post?.mediaType == "image" ?
            <img src={noti.post?.media} className='h-full object-cover' />
            : noti.post ?
              <video src={noti.post?.media} muted loop className='h-full w-full object-cover' />
              : null}
      </div>
    </div>
  )
}

export default NotificationCard
