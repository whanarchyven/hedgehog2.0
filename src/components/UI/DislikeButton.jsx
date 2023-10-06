import React, {useState} from 'react';
import {classList} from "../helpers/classList";
import dislikeIconActive from "../../images/reactions/dislike_active.svg";
import dislikeIcon from "../../images/reactions/dislike.svg";

const DislikeButton = ({dislikesQnt, isDisliked, callback}) => {


    return (
        <div
            className={classList('transition-all duration-300 border-bblue border-2 mr-3 gap-2 p-1.5 rounded-xl h-10 flex items-center justify-between', isDisliked ? 'bg-bblue text-white' : 'bg-transparent text-bblue')}
            onClick={() => {
                callback()
            }}>
            {isDisliked?<img className={'h-full'} src={dislikeIconActive}/>:<img className={'h-full'} src={dislikeIcon}/>}
            <p className={'text-xl font-inter font-[600]'}>{dislikesQnt}</p>
        </div>
    );
};

export default DislikeButton;