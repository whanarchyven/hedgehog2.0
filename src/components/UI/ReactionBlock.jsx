import React, {useEffect, useState} from 'react';
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import axios from "axios";
import {server} from "../env/env";
import {useAuth} from "../../hooks/use-auth";

const ReactionBlock = (props) => {

    const [isDisliked,setIsDisliked]=useState(false)
    const [isLiked,setIsLiked]=useState(false)
    const {isAuth, user,access} = useAuth();

    const [likes,setLikes]=useState(props?.likes)
    const [dislikes,setDislikes]=useState(props?.dislikes)

    const setLike=async ()=>{
        await axios.post(`${server}/posts/add-like/`,{id:props.postId},{
            headers:{Authorization:access}
        }).then(()=>{
            props.updateLikes()
        })
    }

    const setDislike=async ()=>{
        await axios.post(`${server}/posts/add-dislike/`,{id:props.postId},{
            headers:{Authorization:access}
        }).then(()=>{
            props.updateDislikes()
        })
    }

    useEffect(()=>{
        setLikes(props?.likes)
    },[props?.likes])

    useEffect(()=>{
        setDislikes(props?.dislikes)
    },[props?.dislikes])

    useEffect(()=>{
        let tempUser=JSON.parse(user)
        console.log(likes)
        console.log(likes?.find(like=>like==tempUser._id))
        if(likes?.find(like=>like==tempUser._id)){
            setIsLiked(true)
        }else{
            setIsLiked(false)
        }
    },[likes])

    useEffect(()=>{
        let tempUser=JSON.parse(user)
        console.log(dislikes)
        console.log(dislikes?.find(dislike=>dislike==tempUser._id))
        if(dislikes?.find(dislike=>dislike==tempUser._id)){
            setIsDisliked(true)
        }else{
            setIsDisliked(false)
        }
    },[dislikes])


    return (
        <div className={'flex mt-4 items-center'}>
            <LikeButton callback={()=>{setLike()}} setLikes={setLikes} setLiked={setIsLiked} likesQnt={likes?.length} isLiked={isLiked}></LikeButton>
            <DislikeButton callback={()=>{setDislike()}} setDislikes={setDislikes} setDisliked={setIsDisliked} dislikesQnt={dislikes?.length} isDisliked={isDisliked} />
            <div className={'w-9 h-9 border-black rounded-full bg-white flex items-center  justify-center'} onClick={()=>{props?.closeCommentPop()}}>
                <img src={`${server}/comment.svg`}/>
            </div>
        </div>
    );
};

export default ReactionBlock;