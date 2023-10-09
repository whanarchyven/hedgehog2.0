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
import TourBanner from "../components/TourBanner";


const ToursPage = () => {
    const dispatch = useDispatch();
    const {push} = useHistory()
    const {isAuth, user,access} = useAuth();

    const [tours, setTours] = useState(null)


    const fetchUsersPosts = async () => {
        await axios.get(`${server}/tours/`,{headers:{Authorization:access}}).then((res, err) => {
            setTours(res.data)
            console.log(res.data)
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
                <p className={'text-white font-bold w-full text-center text-2xl'}>Прогулки в Чебоксарах</p>
            </div>
            <div className={'p-4 pb-32 mt-12 flex flex-col gap-12 overflow-y-scroll'}>
                {tours?.map((tour)=>{
                    return (
                        <TourBanner {...tour}></TourBanner>
                    )
                })}
            </div>
        </Layout>
    )
}

export default ToursPage
