import React from 'react';
import {server} from "./env/env";
import places from "images/icons/place.svg"
import time from "images/icons/time.svg"
import Button from "./UI/Button";
import {motion} from "framer-motion";
import {useHistory} from "react-router-dom";

const PlaceBanner = (props) => {

    const {push}=useHistory()

    return (
        <motion.div initial={{y: -20, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{once: true}}
                    transition={{ease: 'easeInOut', duration: 0.7}} className={'w-full h-fit rounded-lg shadow-xl flex gap-5 overflow-hidden'}>
            <div className={'w-[30%] aspect-square'}>
                <img className={'w-full object-center h-full object-cover'} src={`${server}/${props?.photos?.split('|')[0]}`}/>
            </div>
            <div className={'flex w-[70%] gap-4 pr-4 py-4 flex-col'}>
                <p className={'text-sm font-bold font-inter whitespace-pre-wrap'}>{props?.name}</p>
                <p className={'text-xs'}>{props?.description?.split(' ').splice(0,15).join(' ')} ...</p>
                <Button callback={()=>{push(`/places/${props?._id}`)}} outlined className={'text-xs'}>Смотреть полностью</Button>
            </div>
        </motion.div>
    );
};

export default PlaceBanner;