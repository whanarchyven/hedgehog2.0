import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../hooks/use-auth";
import {server} from "../components/env/env";
import PostGallery from "../components/PostGallery";


const PlacePage = (props) => {
    const {id}=useParams()
    const {isAuth, user,access} = useAuth();
    const push=useHistory()
    const [place,setPlace]=useState(null)

    const [places,setPlaces]=useState([])

    const fetchPlace = async () => {
        if(access){
            await axios.get(`${server}/places/${id}`,{headers:{Authorization:access}}).then((res, err) => {
                setPlace(res.data)
            })
        }
    }


    useEffect(()=>{
        fetchPlace()
    },[])


    return (
        <Layout>
            <div className={'w-full p-4'}>
                <p onClick={()=>{push.goBack()}}>🠐 Назад</p>
                <div className={'flex mt-5 flex-col gap-5'}>
                    <p className={'font-bold text-xl'}>{place?.name}</p>
                    <div className={'w-full rounded-lg overflow-hidden h-72'}>
                        <PostGallery imagesUrl={place?.photos}></PostGallery>
                    </div>
                    <p className={'text-sm'}>{place?.description}</p>
                </div>
            </div>
        </Layout>
    );
};

export default PlacePage;