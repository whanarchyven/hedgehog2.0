import React, {useEffect, useState} from 'react';
import axios from "axios";
import {server} from "./env/env";
import {useAuth} from "../hooks/use-auth";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import russianStrings from "react-timeago/lib/language-strings/ru";
import {classList} from "./helpers/classList";
import {useHistory} from "react-router-dom";

const PostUserHeader = (props) => {
    const [user,setUser]=useState(null)
    const [isLoading,setIsLoading]=useState(true);
    const formatter = buildFormatter(russianStrings)

    const {push}=useHistory()

    const {isAuth, userInfo,access} = useAuth();
    const fetchUserInfo = async (id) => {
        if(access){
            await axios.get(`${server}/users/${id}`,{headers:{Authorization:access}}).then((res, err) => {
                console.log(res.data)
                setUser(res.data)
            })
        }
    }

    useEffect( ()=>{
        if(props.user){
            fetchUserInfo(props.user).then(()=>{
                setIsLoading(false)
            })
        }
    },[])



    return (
        <div className={'flex gap-3 items-start'}>
            <div onClick={()=>{
                if(!isLoading&&user) {
                    push(`/users/${user._id}`)
                }
            }} className={'flex items-start'}>
                <div className={classList('w-8 mr-2 rounded-full aspect-square bg-zinc-300 object-cover',isLoading?'animate-pulse':'')}>
                    {isLoading?null:<img src={`${server}/${user?.avatar}`} className={'w-full rounded-full h-full object-cover'}/>}
                </div>
                <div className={'flex flex-col gap-1'}>
                    {isLoading?<div className={'h-3 w-32 bg-zinc-300 animate-pulse rounded-full'}></div>:<p className={'text-sm leading-[100%] font-inter font-bold'}>{user?.name} {user?.surname}</p>}
                    {isLoading?<div className={'h-3 w-20 bg-zinc-300 animate-pulse rounded-full'}></div>:<p className={'text-xs leading-[100%] font-normal'}>{props?.location}</p>}
                </div>
            </div>
            {isLoading?<div className={'h-3 w-20 bg-zinc-300 animate-pulse rounded-full'}></div>:<p className={'text-xs font-inter text-[#555555]'}><TimeAgo date={props?.date} formatter={formatter}/></p>}
        </div>
    );
};

export default PostUserHeader;