import React, {useEffect, useState} from 'react';
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import axios from "axios";
import {server} from "../env/env";
import {useAuth} from "../../hooks/use-auth";
import comment_icon from "images/comments.svg"
import share from "images/share.svg"
import close from "images/close.svg"
import Comments from "../Comments";
import {AnimatePresence, motion} from "framer-motion";

const ReactionBlock = (props) => {

    const [isDisliked, setIsDisliked] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const {isAuth, user, access} = useAuth();

    const [likes, setLikes] = useState(props?.likes)
    const [dislikes, setDislikes] = useState(props?.dislikes)

    const setLike = async () => {
        await axios.post(`${server}/posts/add-like/`, {id: props.postId}, {
            headers: {Authorization: access}
        }).then(() => {
            props.updateLikes()
        })
    }

    const setDislike = async () => {
        await axios.post(`${server}/posts/add-dislike/`, {id: props.postId}, {
            headers: {Authorization: access}
        }).then(() => {
            props.updateDislikes()
        })
    }

    useEffect(() => {
        setLikes(props?.likes)
    }, [props?.likes])

    useEffect(() => {
        setDislikes(props?.dislikes)
    }, [props?.dislikes])

    useEffect(() => {
        let tempUser = JSON.parse(user)
        console.log(likes)
        console.log(likes?.find(like => like == tempUser._id))
        if (likes?.find(like => like == tempUser._id)) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [likes])

    useEffect(() => {
        let tempUser = JSON.parse(user)
        console.log(dislikes)
        console.log(dislikes?.find(dislike => dislike == tempUser._id))
        if (dislikes?.find(dislike => dislike == tempUser._id)) {
            setIsDisliked(true)
        } else {
            setIsDisliked(false)
        }
    }, [dislikes])

    const [openComments, setOpenComments] = useState(false)
    const [newComment, setNewComment] = useState('')


    const [tempComments, setTempComments] = useState([])

    useEffect(() => {
        setTempComments(props.comments)
    }, [props.comments]);

    const addComment = async (comment) => {
        axios.post(`${server}/posts/add-comment/`, {content: comment, id: props._id}, {
            headers: {Authorization: access}
        }).then((err, res) => {
        })
        setNewComment('')
        alert('Спасибо, комментарий отправлен на проверку!')
        setOpenComments(false)
    }


    return (
        <div className={'flex mt-4 gap-2 px-4 items-center justify-between'}>
            <div className={'flex items-center gap-2'}>
                <LikeButton callback={() => {
                    setLike()
                }} setLikes={setLikes} setLiked={setIsLiked} likesQnt={likes?.length} isLiked={isLiked}></LikeButton>
                {/*<DislikeButton callback={()=>{setDislike()}} setDislikes={setDislikes} setDisliked={setIsDisliked} dislikesQnt={dislikes?.length} isDisliked={isDisliked} />*/}
                <div onClick={() => {
                    setOpenComments(true)
                }}
                     className={'transition-all duration-300  px-3 p-1.5 rounded-full h-10 flex items-center gap-1 bg-transparent border-[#DDDDDD] border-[1px]'}>
                    <img className={'w-5'} src={comment_icon}/>
                    <p className={'font-semibold font-inter'}>{props?.comments?.length??0}</p>
                </div>
            </div>
            <img src={share} className={'w-7 aspect-square'}/>
            {/*<div className={'w-9 h-9 border-black rounded-full bg-white flex items-center  justify-center'} onClick={()=>{props?.closeCommentPop()}}>*/}
            {/*    <img src={`${server}/comment.svg`}/>*/}
            {/*</div>*/}
            {openComments &&
                <div className={'fixed left-0 bottom-0 z-[99999] bg-black bg-opacity-[0.5] w-full h-full'}>
                    <div onClick={() => {
                        setOpenComments(false)
                    }} className={'absolute top-0 left-0 w-full h-1/4'}>

                    </div>
                    <AnimatePresence>
                        <motion.div initial={{y: '100%'}} animate={{y: '0'}} exit={{y: '-100%'}}
                                    transition={{ease: 'easeInOut'}}
                                    className={'w-full text-cBlack bg-white absolute bottom-0 left-0 h-3/4 p-4 rounded-t-2xl'}>
                            <div className={'flex justify-between items-center'}>
                                <p className={'font-light m-0 text-2xl'}>Комментарии к событию</p>
                                <img onClick={() => {
                                    setOpenComments(false)
                                }} className={'w-8 aspect-square'} src={close}/>
                            </div>
                            {props?.comments?.length == 0 ?
                                <p className={'mt-5 text-cBlack text-center'}>Никто пока не прокоментировал это
                                    событие<br/><span className={'font-bold'}>Будьте первым!</span></p> :
                                <Comments comments={tempComments}/>}
                            <div className={'absolute bottom-0 left-0 flex flex-col gap-3 p-4 w-full'}>
                                <textarea onChange={(event) => {
                                    setNewComment(event.target.value)
                                }} placeholder={'Оставить комментарий'} cols={12}
                                          className={'w-full rounded-xl  border-[#DDD] border-[1px] p-4 outline-none focus:outline-0 '}>

                                </textarea>
                                {newComment && <button
                                    className={'w-full text-white p-4 text-base font-inter bg-cBlack font-semibold uppercase rounded-2xl'}
                                    onClick={() => {
                                        addComment(newComment)
                                    }}
                                >
                                    Оставить комментарий
                                </button>}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>}
        </div>
    );
};

export default ReactionBlock;