import React, {useEffect, useRef, useState} from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import geo from "images/geo.svg"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'index.css'
// import required modules
import {Pagination, Navigation} from 'swiper';
import {server} from "./env/env";
import {Link} from "react-router-dom";
import place from "../images/icons/mark_place.svg";

const PostGallery = (props) => {

    const [photos, setPhotos] = useState(props?.imagesUrl?.split('|'))

    useEffect(()=>{
        setPhotos(props?.imagesUrl?.split('|'))
    },[props])

    return (
        <div className={'w-full relative rounded-lg shadow-xl overflow-clip aspect-square'}>
            <Swiper
                pagination={{
                    type: 'bullets',
                    bulletActiveClass: 'bg-[#FFE868] opacity-100',
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper w-full z-0 h-full"
            >
                {photos?.map((item) => {
                    return (
                        <SwiperSlide>
                            {props?.removeServerPrefix ? <img className={'w-full h-full object-cover'} src={item}/> :
                                <img className={'w-full rounded-lg h-full object-cover'} src={`${server}/${item}`}/>}
                        </SwiperSlide>
                    )
                })}
                {!photos ? <SwiperSlide><div className={'w-full h-full rounded-lg bg-zinc-300 animate-pulse'}></div></SwiperSlide> : null}
            </Swiper>
            {!props?.disableMap&&<div className={'absolute flex items-center font-semibold justify-center px-4 py-2 rounded-full gap-2 left-3 bottom-3 bg-orrange z-50'}>
                <Link to={{pathname:'/map',params:{x:props.xCoord,y:props.yCoord}}} className={'p-1 text-white text-xs bg-orrange flex items-center justify-center rounded-xl'}>
                    <img className={'w-4 aspect-square'} src={geo}/>
                </Link>

                {props.location}
            </div>}
        </div>
    );
};

export default PostGallery;