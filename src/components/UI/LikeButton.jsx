import React, {useState} from 'react';
import {classList} from "../helpers/classList";
import likeIcon from 'images/like.svg'
import likeIconActive from 'images/like_active.svg'

const LikeButton = ({likesQnt, isLiked,callback}) => {


    return (
        <div
            className={classList('transition-all duration-300  px-3 p-1.5 rounded-full h-10 flex items-center gap-1', isLiked ? 'bg-orrange text-white' : 'bg-transparent border-[#DDDDDD] border-[1px] text-orrange')}
            onClick={() => {
                callback()
            }}>
            {isLiked?<img className={'w-6 aspect-square'} src={likeIconActive}/>:<img className={'w-6 aspect-square'} src={likeIcon}/>}
            <p className={'text-base text-cBlack font-inter font-semibold'}>{likesQnt}</p>
        </div>
    );
};

export default LikeButton;