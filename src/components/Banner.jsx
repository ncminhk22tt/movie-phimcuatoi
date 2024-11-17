import React from 'react'
import Rating from "../assets/rating.png";
import RatingHalf from "../assets/rating-half.png";
import Temp1 from "../assets/temp-1.jpeg";
import Play from "../assets/play-button.png";
export default function Banner() {
  return (
    <div className='w-full h-[700px] bg-banner bg-center bg-no-repeat bg-cover relative'>
    <div className='absolute w-full h-full top-0 left-0 bg-black opacity-40'/>
        <div className='w-full h-full flex items-center justify-center space-x-[30px] p-4'>
            <div className='flex flex-col space-y-5 items-baseline w-[50%]'>
                <p className=' text-white bg-gradient-to-r from-red-600 to-red-300 py-2 px-3 text-md relative z-20'>TV Show</p>
                <div className='flex flex-col space-y-4 '>
                    <h2 className=' text-white text-[40px] font-bold'>Nghe nói em thích tôi</h2>
                    <div className='flex items-center space-x-3'>
                        <img src={Rating} alt="rating" className='w-8 h-8 ' />
                        <img src={Rating} alt="rating" className='w-8 h-8 ' />
                        <img src={Rating} alt="rating" className='w-8 h-8 ' />
                        <img src={Rating} alt="rating" className='w-8 h-8 ' />
                        <img src={RatingHalf} alt="ratinghalf" className='w-8 h-8 ' />
                    </div>
                    <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quis in aliquam quidem enim fugiat consequatur? Earum quidem sunt excepturi. Dicta libero tempore suscipit pariatur veniam! Fugiat mollitia ducimus est.</p>
                    <div className='flex items-center space-x-4'>
                        <button className='p-2 text-white bg-black font-bold text-sm'>Chi tiết</button>
                        <button className='p-2 text-white bg-red-600 font-bold text-sm'>Xem phim</button>
                    </div>
                </div>
            </div>
            <div className='w-[50%] flex items-center justify-center'>
                <div className='w-[300px] h-[400px] relative group cursor-pointer'>
                    <img src={Temp1} alt="temp1"  className='w-full h-full object-cover' />
                    <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out'>
                        <img src={Play} alt="play-button" className='w-16 h-16 relative z-20'/>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}
