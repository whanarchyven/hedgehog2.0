import React, {useState} from 'react';
import {classList} from "../helpers/classList";

const LikeButton = ({likesQnt, isLiked,callback}) => {


    return (
        <div
            className={classList('transition-all duration-300 border-orrange border-2 mr-3 w-32 px-3 rounded-xl h-10 flex items-center justify-between', isLiked ? 'bg-orrange text-white' : 'bg-transparent text-orrange')}
            onClick={() => {
                callback()
            }}>
            <p className={'text-xs font-inter font-[600]'}>Доверяю</p>
            <p className={'text-xl font-inter font-[600]'}>{likesQnt}</p>
        </div>
    );
};

export default LikeButton;