import React, {useState} from 'react';
import {classList} from "../helpers/classList";
import likeIcon from 'images/reactions/like.svg'
import likeIconActive from 'images/reactions/like_active.svg'

const LikeButton = ({likesQnt, isLiked,callback}) => {


    return (
        <div
            className={classList('transition-all duration-300 border-orrange border-2 mr-3 gap-2 p-1.5 rounded-xl h-10 flex items-center justify-between', isLiked ? 'bg-orrange text-white' : 'bg-transparent text-orrange')}
            onClick={() => {
                callback()
            }}>
            {isLiked?<img className={'h-full'} src={likeIconActive}/>:<img className={'h-full'} src={likeIcon}/>}
            <p className={'text-xl font-inter font-[600]'}>{likesQnt}</p>
        </div>
    );
};

export default LikeButton;