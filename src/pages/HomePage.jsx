import {Redirect, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {useAuth} from 'hooks/use-auth';
import {removeUser} from 'store/slices/userSlice'
import Layout from "../components/Layout";
import Post from "../components/Post";
import searchWrapper from 'images/searchInputWrapper.svg'
import CustomInput from "../components/UI/CustomInput";
import searchIcon from 'images/icons/search.svg'
import logo from "images/logo.png"
import settings from "images/settings.svg"
import notifications from "images/notifications.svg"
import search from "images/search.svg"
import axios from "axios";
import {useEffect,useState} from "react";
import { server } from 'components/env/env';


const HomePage = () => {
    const dispatch = useDispatch();
    const {push} = useHistory()
    const savedData=localStorage.getItem('')

    const {isAuth, user,access} = useAuth();

    const tempDate='2022-09-26T10:00:00.301Z'

    const time = new Date();
    const secondsFull = Math.floor((new Date(tempDate).valueOf() - new Date().valueOf()) / 1000)
    time.setSeconds(secondsFull)

    const [posts, setPosts] = useState([])

    const [caption,setCaption]=useState('')

    const fetchUsersPosts = async () => {
        await axios.get(`${server}/posts?caption=${caption}`,{headers:{Authorization:access}}).then((res, err) => {
            setPosts(res.data)
        })
    }

    useEffect(()=>{
        fetchUsersPosts()
    },[caption])

    return !isAuth ? (
        <Layout>
            <Redirect to="/login"/>
        </Layout>
    ) : (

        <Layout>
            {/*<div className={'w-full sm:max-w-[480px] h-24 bg-orrange rounded-b-[50px] relative flex items-center justify-center'}>*/}
            {/*    /!*<img src={searchWrapper} className={'w-full h-full absolute left-0 top-0'}/>*!/*/}
            {/*    /!*<div className={'w-72'}>*!/*/}
            {/*    /!*    <CustomInput value={caption} Setter={setCaption} placeholder={"Найдём нужное событие!"} icon={searchIcon}></CustomInput>*!/*/}
            {/*    /!*</div>*!/*/}
            {/*</div>*/}
            <div className={' bg-orrange p-4 flex justify-between w-full'}>
                <img className={'w-20'} src={logo}/>
                <div className={'flex gap-3 items-center'}>
                    <img className={'w-6 aspect-square'} src={settings}/>
                    <img className={'w-6 aspect-square'} src={search}/>
                    <img className={'w-6 aspect-square'} src={notifications}/>
                </div>
            </div>
            <div className={'p-4 pb-32'}>
                {posts.length>0&&posts?.map((post)=>{
                    return (
                        <Post {...post}></Post>
                    )
                })}
            </div>
        </Layout>
    )
}

export default HomePage
