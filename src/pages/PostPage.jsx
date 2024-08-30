import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import Post from "../components/Post";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../hooks/use-auth";
import {server} from "../components/env/env";

import arrow_back from "images/arrow_back_ios.svg"

const PostPage = (props) => {
    const {id}=useParams()
    const {isAuth, user,access} = useAuth();
    const push=useHistory()
    const [post,setPost]=useState(null)
    const fetchPost = async () => {
        if(access){
            await axios.get(`${server}/posts/${id}`,{headers:{Authorization:access}}).then((res, err) => {
                console.log(res.data)
                setPost(res.data)
            })
        }
    }

    useEffect(()=>{
        fetchPost()
    },[])

    return (
        <Layout>
            <div className={'w-full p-4'}>
                <div onClick={()=>{push.goBack()}} className={'flex items-center gap-1'}>
                    <img className={'w-4'} src={arrow_back}/>
                    <p >Назад</p>
                </div>
                <Post user={user} access={access} {...post}/>
            </div>
        </Layout>
    );
};

export default PostPage;