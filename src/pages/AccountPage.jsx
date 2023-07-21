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


const AccountPage = () => {
    const dispatch = useDispatch();
    const {push} = useHistory()
    const {isAuth, user,access} = useAuth();


    const tempDate = '2022-09-26T10:00:00.301Z'

    const time = new Date();
    const secondsFull = Math.floor((new Date(tempDate).valueOf() - new Date().valueOf()) / 1000)
    time.setSeconds(secondsFull)


    const [account, setAccount] = useState(null)
    const [userPosts, setUserPosts] = useState(null)


    const fetchUsersPosts = async () => {
        await axios.get(`http://localhost:5000/posts/user/${account.username}/`,{headers:{Authorization:access}}).then((res, err) => {
            setUserPosts(res.data.reverse())
        })
    }

    useEffect(() => {
        setAccount(JSON.parse(user))
    }, [])

    useEffect(()=>{
        if(account){
            fetchUsersPosts()
        }
    },[account])

    const [isShowed,setIsShowed]=useState(false)

    return isAuth ? (
        <Layout>
            <div className={'w-full'}>
                <div className={'min-h-[40vh] flex justify-center relative w-full'}>
                    <div className={'w-full flex flex-col items-center h-full absolute z-[2]'}>
                        <img className={'w-36 h-36 object-cover mt-4 rounded-full border-2 border-white'}
                             src={account?.avatar ? `${server}/${account?.avatar}` : ''}/>
                        <p className={'font-inter font-bold text-2xl text-white mt-3'}>{account?.name} {account?.surname}</p>
                        <div className={'w-52 mt-2'}>
                            <ProgressBar value={account?.exp ? account?.exp : 0} maximum={100}></ProgressBar>
                        </div>
                        <p className={'font-inter font-bold text-lg text-white mt-3'}>{account?.level} уровень,
                            знаток</p>
                        <p className={'font-inter font-medium text-sm underline text-white mt-1'}>Подробнее</p>
                    </div>
                    <img src={profileOverlay} className={'w-full z-[0] absolute bottom-0 h-full object-cover'}/>
                    <div className={'absolute z-[999] flex flex-col items-end right-3 top-3'}>
                        <div onClick={()=>{setIsShowed(!isShowed)}} className={'w-5'}>
                            <img className={'w-full aspect-square'} src={`${server}/settings.svg`}/>
                        </div>
                        {isShowed?<div className={'relative flex justify-end items-end w-20 p-2 bg-white mt-2 rounded-xl'}>
                            <p onClick={()=>{localStorage.removeItem('userInfo');localStorage.removeItem('userAccess');push('/login')}} className={'underline font-bold'}>Выйти</p>
                        </div>:null}
                    </div>
                </div>
                <div className={'p-4'}>
                    <p className={'text-black text-xl font-bold'}>Публикации</p>
                    {userPosts?.length > 0 ? <div className={'w-full mt-3 grid grid-cols-3 gap-2'}>
                        {userPosts?.map((post) => {
                            return <div className={'w-full aspect-square'} onClick={()=>{push(`/post/${post?._id}`)}}>
                                <img className={'w-full h-full object-cover '} src={`${server}/${post?.image}`}/>
                            </div>
                        })}
                    </div> : <div className={'flex h-96 items-center justify-center w-full'}>
                        <div className={'flex flex-col items-center'}>
                            <p className={'font-medium opacity-50'}>У вас пока нет публикаций</p>
                            <Button className={'mt-5'} callback={()=>{push('/publication')}}>Создать публикацию!</Button>
                        </div>
                    </div>}

                </div>
            </div>
        </Layout>
    ) : (
        <Redirect to="/login"/>

    )
}

export default AccountPage
