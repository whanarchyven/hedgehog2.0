import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
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
import PostGallery from "./PostGallery";
import PostUserHeader from "./PostUserHeader";
import close from "images/icons/close.svg"

import place from "images/icons/mark_place.svg"
import {classList} from "./helpers/classList";
import {Link, Redirect} from "react-router-dom";
import router from "react-router-dom/es/Router";

const Post = (props) => {


    const {isAuth, user, access} = useAuth();
    const [likes, setLikes] = useState(props.likes)
    const [dislikes, setDislikes] = useState(props.dislikes)
    const [coments, setComents] = useState(props.comments)

    const updateLikes = async () => {
        await axios.get(`${server}/posts/${props._id}`, {
            headers: {Authorization: access}
        }).then((res, err) => {
            console.log(res.data.comments)
            setLikes(res.data.likes)
            setDislikes(res.data.dislikes)
            setComents(res.data.comments)
        })
    }

    const updateDislikes = async () => {
        await axios.get(`${server}/posts/${props._id}`, {
            headers: {Authorization: access}
        }).then((res, err) => {
            setLikes(res.data.likes)
            setDislikes(res.data.dislikes)
        })
    }


    const addComment = async (comment) => {
        axios.post(`${server}/posts/add-comment/`, {content: comment, id: props._id}, {
            headers: {Authorization: access}
        }).then((err, res) => {
            console.log(err, res)
        })
    }

    const [newComment, setNewComment] = useState('')
    const [isCommentsPopOpen, setIsCommentsPopOpen] = useState(false)

    useEffect(() => {
        if (props._id) {
            updateLikes()
        }
    }, [props])


    const variants1={
        open:{opacity:1},
        closed:{opacity:0},
    }


    return (
        <motion.div initial={{y: -20, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    viewport={{once: true}}
                    transition={{ease: 'easeInOut', duration: 0.7}}
                    className={'w-full my-8 flex-col items-center'}>
            <div className={'flex items-center justify-between'}>
                <PostUserHeader location={props.location} user={props?.user} date={props?.date}></PostUserHeader>
                <Link to={{pathname:'/map',params:{x:props.xCoord,y:props.yCoord}}} className={'p-1 text-white text-xs bg-orrange flex items-center justify-center rounded-xl'}>
                    <img src={place} className={'w-full h-full'}/>
                </Link>
            </div>
            {/*<img src={`${server}/${props?.image}`} className={'w-full object-cover mt-4 aspect-square'}/>*/}
            <PostGallery imagesUrl={props?.image}></PostGallery>
            <p className={'font-inter mt-4 text-justify font-normal leading-[100%]'}>{props?.caption}</p>
            <ReactionBlock closeCommentPop={() => {
                setIsCommentsPopOpen(true)
            }} dislikes={dislikes} postId={props._id} access={props.access} likes={likes}
                           updateDislikes={updateDislikes} updateLikes={updateLikes} user={props.user}/>
            <Comments comments={coments}/>
            <motion.div animate={isCommentsPopOpen?"open":"closed"} variants={variants1}
                        className={classList('fixed top-0 left-0 w-full h-full bg-white z-[800] bg-opacity-50 backdrop-blur flex items-center justify-center',isCommentsPopOpen?'':'hidden')}>
                <motion.div  className={'w-96 bg-white border-2 border-orrange p-3 rounded-xl'}>
                    <div className={'w-full justify-between flex items-top'}>
                        <p className={'text-xl font-bold text-black'}>Прокоментируйте публикацию <br/>{props?.nickname}!
                        </p>
                        <div onClick={() => {
                            setIsCommentsPopOpen(false)
                        }}><img src={close} className={'w-7 aspect-square'}/>
                        </div>
                    </div>
                    <input onChange={(event) => {
                        setNewComment(event.target.value)
                    }} placeholder={'Ваш комментарий'}
                           className={' p-2 border-orrange border-2 w-full rounded-xl mt-3 h-12'}/>
                    <Button className={'mt-3 h-12'} callback={() => {
                        addComment(newComment);
                        updateLikes();
                        setIsCommentsPopOpen(false)
                    }}>Опубликовать</Button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Post;