import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import Post from "../components/Post";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../hooks/use-auth";
import {server} from "../components/env/env";

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
                <p onClick={()=>{push.goBack()}}>🠐 Назад</p>
                <Post user={user} access={access} {...post}/>
            </div>
        </Layout>
    );
};

export default PostPage;