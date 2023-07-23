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
import { server } from 'components/env/env';


const DefaultPage = () => {
    const dispatch = useDispatch();
    const {push} = useHistory()
    const {isAuth, user,access} = useAuth();

    const tempDate='2022-09-26T10:00:00.301Z'

    const time = new Date();
    const secondsFull = Math.floor((new Date(tempDate).valueOf() - new Date().valueOf()) / 1000)
    time.setSeconds(secondsFull)

    const [posts, setPosts] = useState(null)


    const fetchUsersPosts = async () => {
        await axios.get(`${server}/posts/`,{headers:{Authorization:access}}).then((res, err) => {
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
            <Redirect to="/feed" />
        </Layout>
    )
}

export default DefaultPage
