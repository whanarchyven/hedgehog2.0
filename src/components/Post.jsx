import React, {useEffect, useState} from 'react';

import tempImage from 'images/tempImage.png'
import LikeButton from "./UI/LikeButton";
import DislikeButton from "./UI/DislikeButton";
import ReactionBlock from "./UI/ReactionBlock";
import Comments from "./Comments";
import TimeAgo from 'react-timeago'
import russianStrings from 'react-timeago/lib/language-strings/ru'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {server} from "./env/env";
import axios from "axios";
import {useAuth} from "../hooks/use-auth";
import Button from "./UI/Button";
import fa from "react-timeago/lib/language-strings/fa";

const Post = (props) => {

    const formatter = buildFormatter(russianStrings)
    const {isAuth, user,access} = useAuth();
    const comments = [
        { username: 'SunnyDays', content: 'Вау, это такая красивая фотография! Я просто не могу отвести от нее глаз. Этот закат выглядит как картина!' },
        { username: 'NatureLover', content: 'Я обожаю природу, и эта фотография просто захватывает дух! Она напоминает мне о том, насколько великолепна наша планета.' },
        { username: 'TravelBug', content: 'Где это было снято? Я хочу поехать туда и увидеть все это своими глазами!'},
        { username: 'Foodie', content: 'Эта фотография заставляет меня желать, чтобы я находился там и наслаждался местной кухней!'},
        { username: 'FitnessFanatic', content: 'Я могу только представить, какой потрясающий вид находится с той точки, где вы сделали эту фотографию. Я бы с удовольствием сделал туда поход!'},
        { username: 'Fashionista', content: 'Какой прекрасный наряд! Он прекрасно сочетается с фоном, и вы выглядите потрясающе!'},
        { username: 'MusicLover', content: 'Эта фотография вызывает у меня такие же яркие эмоции, как и любимый мною музыкальный трек!'},
        { username: 'ArtEnthusiast', content: 'Я нахожу это изображение просто великолепным! Оно напоминает мне об искусстве и том, как оно может вдохновлять людей.' },
        { username: 'DogLover', content: 'О, какой прекрасный щенок! Он такой милый и обаятельный! Я хочу его себе!' },
        { username: 'Bookworm', content: 'Эта фотография заставляет меня желать прочитать книгу, чтобы отправиться в такое же красивое место и насладиться всей красотой, которую он предлагает!'}
    ];

    const [likes,setLikes]=useState(props.likes)
    const [dislikes,setDislikes]=useState(props.dislikes)
    const [coments,setComents]=useState(props.comments)

    const updateLikes=async ()=>{
        await axios.get(`${server}/posts/${props._id}`,{
            headers:{Authorization:access}
        }).then((res,err)=>{
            console.log(res.data.comments)
            setLikes(res.data.likes)
            setDislikes(res.data.dislikes)
            setComents(res.data.comments)
        })
    }

    const updateDislikes=async ()=>{
        await axios.get(`${server}/posts/${props._id}`,{
            headers:{Authorization:access}
        }).then((res,err)=>{
            setLikes(res.data.likes)
            setDislikes(res.data.dislikes)
        })
    }


    const addComment=async (comment)=>{
        axios.post(`${server}/posts/add-comment/`,{content:comment,id:props._id},{
            headers:{Authorization:access}
        }).then((err,res)=>{
            console.log(err,res)
        })
    }

    const [newComment,setNewComment]=useState('')
    const [isCommentsPopOpen,setIsCommentsPopOpen]=useState(false)

    useEffect(()=>{
        if(props._id){
            updateLikes()
        }
    },[props])

    return (
        <div className={'w-full my-8 flex-col items-center'}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-start'}>
                    <div className={'flex items-center'}>
                        <div className={'w-8 mr-2 rounded-full aspect-square bg-zinc-500 object-cover'}>

                        </div>
                        <div className={'flex flex-col'}>
                            <p className={'text-sm font-inter font-bold'}>{props?.nickname}</p>
                            <p className={'text-xs font-normal'}>{props?.location}</p>
                        </div>
                    </div>
                    <p className={'text-xs font-inter ml-2 mt-0.5 text-[#555555]'}><TimeAgo date={props?.date} formatter={formatter}/></p>
                </div>
                <div className={'w-20 h-8 text-white text-xs bg-black flex items-center justify-center rounded-xl'}>
                    На карте
                </div>
            </div>
            <img src={`${server}/${props?.image}`} className={'w-full object-cover mt-4 aspect-square'}/>
            <p className={'font-inter mt-4 text-justify font-normal leading-[100%]'}>{props?.caption}</p>
            <ReactionBlock closeCommentPop={()=>{setIsCommentsPopOpen(true)}} dislikes={dislikes} postId={props._id} access={props.access} likes={likes} updateDislikes={updateDislikes} updateLikes={updateLikes} user={props.user} />
            <Comments comments={coments}/>
            {isCommentsPopOpen?<div className={'fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 backdrop-blur flex items-center justify-center'}>
                <div className={'w-96 bg-white border-2 border-orrange p-3 rounded-xl'}>
                    <div className={'w-full justify-between flex items-top'}>
                        <p className={'text-xl font-bold text-black'}>Прокоментируйте публикацию <br/>{props?.nickname}!</p>
                        <div onClick={()=>{setIsCommentsPopOpen(false)}}>X</div>
                    </div>
                    <input onChange={(event)=>{setNewComment(event.target.value)}} placeholder={'Ваш комментарий'} className={' p-2 border-orrange border-2 w-full rounded-xl mt-3 h-12'}/>
                    <Button className={'mt-3 h-12'} callback={()=>{addComment(newComment);updateLikes();setIsCommentsPopOpen(false)}}>Опубликовать</Button>
                </div>
            </div>:null}
        </div>
    );
};

export default Post;