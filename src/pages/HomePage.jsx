import {Redirect, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {useAuth} from 'hooks/use-auth';
import {removeUser} from 'store/slices/userSlice'
import Layout from "../components/Layout";
import Post from "../components/Post";
import searchWrapper from 'images/searchInputWrapper.svg'
import CustomInput from "../components/UI/CustomInput";
import searchIcon from 'images/icons/search.svg'
import axios from "axios";
import {useEffect,useState} from "react";


const HomePage = () => {
    const dispatch = useDispatch();
    const {push} = useHistory()
    const {isAuth, user,access} = useAuth();

    const tempDate='2022-09-26T10:00:00.301Z'

    const time = new Date();
    const secondsFull = Math.floor((new Date(tempDate).valueOf() - new Date().valueOf()) / 1000)
    time.setSeconds(secondsFull)

    const [posts, setPosts] = useState(null)


    const fetchUsersPosts = async () => {
        await axios.get(`http://localhost:5000/posts/`,{headers:{Authorization:access}}).then((res, err) => {
            setPosts(res.data)
        })
    }

    useEffect(()=>{
        fetchUsersPosts()
    },[])

    return !isAuth ? (
        <Layout>
            <Redirect to="/login" />
        </Layout>
    ) : (

        <Layout>
            <div className={'w-full h-24 bg-orrange rounded-b-[50px] relative flex items-center justify-center'}>
                {/*<img src={searchWrapper} className={'w-full h-full absolute left-0 top-0'}/>*/}
                <div className={'w-72'}>
                    <CustomInput placeholder={"Найдём нужное событие!"} icon={searchIcon}></CustomInput>
                </div>
            </div>
            <div className={'p-4 pb-32 overflow-y-scroll'}>
                {posts?.map((post)=>{
                    return (
                        <Post {...post}></Post>
                    )
                })}
            </div>
        </Layout>
    )
}

export default HomePage
