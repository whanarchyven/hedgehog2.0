import React, {useState} from 'react';
import {classList} from "../helpers/classList";

const DislikeButton = ({dislikesQnt, isDisliked, callback}) => {


    return (
        <div
            className={classList('transition-all duration-300 border-bblue border-2 mr-3 w-32 px-3 rounded-xl h-10 flex items-center justify-between', isDisliked ? 'bg-bblue text-white' : 'bg-transparent text-bblue')}
            onClick={() => {
                callback()
            }}>
            <p className={'text-xs font-inter font-[600]'}>Не доверяю</p>
            <p className={'text-xl font-inter font-[600]'}>{dislikesQnt}</p>
        </div>
    );
};

export default DislikeButton;