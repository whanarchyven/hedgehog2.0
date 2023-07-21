import React, {useEffect, useState} from 'react';
import Comment from "./Comment";
import axios from "axios";
import {server} from "./env/env";
import {useAuth} from "../hooks/use-auth";

const Comments = ({comments}) => {
    const [showMore,setShowMore]=useState(comments?.length>2?true:false)
    const {isAuth,user,access}=useAuth()

    const [commentsContent,setCommentsContent]=useState([])

    useEffect(()=>{
        let temp=[]
        if(comments){
            comments.map(async (comment)=>{
                let tempComment='';
                    await axios.get(`${server}/comments/${comment}`,{
                    headers:{Authorization:access}
                }).then((res)=>{
                    tempComment=res.data
                })
                temp.push(tempComment)
            })
        }
        setCommentsContent(temp)
    },[])

    return (
        <div className={'w-full mt-3'}>
            {/*{showMore?<p className={'text-gray-600 font-medium'} onClick={()=>{setShowMore(false)}}>Показать все комментарии ({comments.length})</p>:null}*/}
            {commentsContent.map((comment,counter)=>{
                return <Comment key={counter} comment={comment}></Comment>
            })}
        </div>
    );
};

export default Comments;