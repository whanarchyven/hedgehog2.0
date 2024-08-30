import {Redirect, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {useAuth} from 'hooks/use-auth';
import {removeUser} from 'store/slices/userSlice'
import Layout from "../components/Layout";
import profileOverlay from 'images/profile_overlay.svg'
import ProgressBar from "../components/UI/ProgressBar";
import tempImage from 'images/tempImage.png'
import {useEffect, useState} from "react";
import {server} from "../components/env/env";
import axios from "axios";
import Button from "../components/UI/Button";
import {getLevel} from "../components/helpers/getLevel";
import {motion} from "framer-motion";
import {classList} from "../components/helpers/classList";

const AccountPage = () => {
    const dispatch = useDispatch();
    const {push} = useHistory()
    const {isAuth, user, access} = useAuth();


    const tempDate = '2022-09-26T10:00:00.301Z'

    const time = new Date();
    const secondsFull = Math.floor((new Date(tempDate).valueOf() - new Date().valueOf()) / 1000)
    time.setSeconds(secondsFull)


    const [account, setAccount] = useState(null)
    const [userPosts, setUserPosts] = useState(null)


    const [postsLoading, setPostsLoading] = useState(true)

    const fetchUsersPosts = async () => {
        await axios.get(`${server}/posts/user/${account.username}/`, {headers: {Authorization: access}}).then((res, err) => {
            setUserPosts(res.data.reverse())
            setPostsLoading(false);
        })
    }

    const fetchUser = async (id) => {
        await axios.get(`${server}/users/${id}/`, {headers: {Authorization: access}}).then((res, err) => {
            setAccount(res.data)
        })
    }

    useEffect(() => {
        fetchUser(JSON.parse(user)._id)
    }, [])

    useEffect(() => {
        if (account) {
            fetchUsersPosts()
        }
    }, [account])

    const variants={
        close:{y: -20, opacity: 0},
        open:{y: 0, opacity: 1}
    }


    const [isShowed, setIsShowed] = useState(false)

    return isAuth ? (
        <Layout>
            <div className={'w-full'}>
                <div className={'min-h-[40vh] flex justify-center relative w-full'}>
                    <div className={'w-full flex flex-col items-center h-full absolute z-[2]'}>
                        {account?.avatar ?
                            <img className={'w-36 h-36 object-cover mt-4 rounded-full border-2 border-white'}
                                 src={account?.avatar ? `${server}/${account?.avatar}` : ''}/> : <div
                                className={'w-36 h-36 object-cover mt-4 rounded-full border-2 border-transparent bg-zinc-300 animate-pulse'}></div>}
                        {account ?
                            <p className={'font-inter font-bold text-2xl leading-[100%] text-cBlack mt-3'}>{account?.name} {account?.surname}</p> :
                            <div className={'w-32 mt-3 rounded-full h-6 bg-zinc-300 animate-pulse'}></div>}
                        <div className={'w-52 mt-2'}>
                            {account ? <ProgressBar
                                    value={account?.exp !== undefined ? account?.exp - getLevel(account?.exp)[0].exp : 0}
                                    maximum={getLevel(account?.exp)[1].exp - getLevel(account?.exp)[0].exp}></ProgressBar> :
                                <ProgressBar value={0} maximum={100}></ProgressBar>}
                        </div>
                        {account ?
                            <p className={'font-inter font-bold leading-[100%] text-lg text-cBlack mt-3'}>{account ? getLevel(account?.exp)[0].level : 0} уровень
                                - {account ? getLevel(account?.exp)[0].name : 0}</p> :
                            <div className={'mt-3 bg-zinc-300 rounded-full h-4 animate-pulse w-60'}></div>}
                        <p onClick={() => {
                            push('/rating')
                        }} className={'font-inter font-medium text-sm underline text-cBlack mt-1'}>Подробнее</p>
                    </div>
                    <img src={profileOverlay} className={'w-full z-[0] absolute bottom-0 h-full object-cover'}/>
                    <div className={'absolute z-[999] flex flex-col items-end right-3 top-3'}>
                        <div onClick={() => {
                            setIsShowed(!isShowed)
                        }} className={'w-8'}>
                            <img className={'w-full aspect-square'} src={`${server}/settings.svg`}/>
                        </div>
                        <motion.div animate={!isShowed?"close":"open"} variants={variants} className={classList('relative flex justify-end items-end w-20 p-2 bg-white mt-2 rounded-xl',!isShowed?'opacity-0':'')}>
                            <p onClick={() => {
                                localStorage.removeItem('userInfo');
                                localStorage.removeItem('userAccess');
                                push('/login')
                            }} className={'underline font-bold'}>Выйти</p>
                        </motion.div>
                    </div>
                </div>
                <div className={'p-4'}>
                    <p className={'text-black text-xl font-bold'}>Публикации</p>
                    {postsLoading ? <div className={'w-full mt-3 grid grid-cols-3 gap-2'}>
                        {[1,2,3,4,5,6,7,8,9].map((item)=>{
                            return(
                                <motion.div initial={{y: -20, opacity: 0}}
                                            whileInView={{y: 0, opacity: 1}}
                                            viewport={{once: true}}
                                            transition={{ease: 'easeInOut', duration: 0.7,delay:0.1*item}} key={item} className={'w-full aspect-square bg-zinc-300 animate-pulse rounded-lg'}>
                                </motion.div>
                            )
                        })}
                    </div> : <div>
                        {userPosts?.length > 0 ? <div className={'w-full transition-all duration-300 mt-3 grid grid-cols-3 gap-2'}>
                            {userPosts?.map((post,counter) => {
                                return <motion.div initial={{y: -20, opacity: 0}}
                                                   whileInView={{y: 0, opacity: 1}}
                                                   viewport={{once: true}}
                                                   transition={{ease: 'easeInOut', duration: 0.7,delay:0.1*counter}} className={'w-full aspect-square overflow-clip rounded-lg'} onClick={() => {
                                    push(`/post/${post?._id}`)
                                }}>
                                    <img className={'w-full h-full object-cover '}
                                         src={`${server}/${post?.image?.split('|')[0]}`}/>
                                </motion.div>
                            })}
                        </div> : <div className={'flex h-96 items-center justify-center w-full'}>
                            <div className={'flex flex-col items-center'}>
                                <p className={'font-medium opacity-50'}>У вас пока нет публикаций</p>
                                <Button className={'mt-5'} callback={() => {
                                    push('/publication')
                                }}>Создать публикацию!</Button>
                            </div>
                        </div>}

                    </div>}
                </div>
            </div>
        </Layout>
    ) : (
        <Redirect to="/login"/>

    )
}

export default AccountPage
