import React, {useEffect, useRef, useState} from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'index.css'
// import required modules
import {Pagination, Navigation} from 'swiper';
import {server} from "./env/env";

const PostGallery = (props) => {

    const [photos, setPhotos] = useState(props?.imagesUrl?.split('|'))

    useEffect(()=>{
        setPhotos(props?.imagesUrl?.split('|'))
    },[props])

    return (
        <div className={'w-full my-3 rounded-lg shadow-xl overflow-clip aspect-square'}>
            <Swiper
                pagination={{
                    type: 'progressbar',
                    progressbarFillClass: 'progress-bar-orange'
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
        </div>
    );
};

export default PostGallery;