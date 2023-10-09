import React, {useEffect, useRef, useState} from 'react';
import Layout from "../components/Layout";
import Post from "../components/Post";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../hooks/use-auth";
import {server} from "../components/env/env";
import placesIcon from "../images/icons/place.svg";
import time from "../images/icons/time.svg";
import PlaceBanner from "../components/PlaceBanner";
import Button from "../components/UI/Button";
import table from "images/icons/table.svg"
import table_active from "images/icons/table_active.svg"
import map_tab from "images/icons/map_tab.svg"
import map_tab_active from "images/icons/map_tab_active.svg"
import { YMaps, Map, Placemark, RoutePanel } from 'react-yandex-maps';
const TourPage = (props) => {
    const {id}=useParams()
    const {isAuth, user,access} = useAuth();
    const push=useHistory()
    const [tour,setTour]=useState(null)

    const [places,setPlaces]=useState([])


    const fetchTour = async () => {
        if(access){
            await axios.get(`${server}/tours/${id}`,{headers:{Authorization:access}}).then((res, err) => {
                setTour(res.data)

                // res.data.places.map(async (place,counter)=>{
                //
                // })
            })
        }
    }

    const fetchPlaces=async ()=>{
        tour.places.map(async (place)=>{
            await axios.get(`${server}/places/${place}`,{headers:{Authorization:access}}).then((response)=>{
                setPlaces(prevState => [...prevState,response.data])
            })
        })
    }

    useEffect(()=>{
        fetchTour()
    },[])

    useEffect(() => {
        fetchPlaces()
    }, [tour]);

    const [tabs,setTabs]=useState('grid')

    const [activeBalloonId,setActiveBalloonId]=useState('')

    const map = useRef(null);
    const mapState = {
        center: [56.139918, 47.247728],
        zoom: 13
    };
    const [once,setOnce]=useState(true)

    const addRoute = (ymaps) => {
        let temp=[]
        places.map((item)=>{
            temp.push([item.xCoord,item.yCoord])
        })
        console.log(temp);
        const multiRoute = new ymaps.multiRouter.MultiRoute(
            {
                referencePoints: temp,
                params: {
                    routingMode: "pedestrian"
                },
            },
            {
                boundsAutoApply: true
            },        );

        map.current.geoObjects.add(multiRoute);
    };

    return (
        <Layout>
            <div className={'w-full p-4'}>
                <p onClick={()=>{push.goBack()}}>🠐 Назад</p>
                <div className={'flex mt-5 flex-col gap-5'}>
                    <p className={'font-bold text-xl'}>{tour?.name}</p>
                    <div className={'flex items-center gap-3'}>
                        <div className={'flex items-center gap-2'}>
                            <img className={'w-6 aspect-square'} src={placesIcon}/>
                            <p className={'text-sm font-bold  pt-0.5 leading-[100%]'}>{tour?.places.length} места</p>
                        </div>
                        <div className={'flex items-center gap-2'}>
                            <img className={'w-6 aspect-square'} src={time}/>
                            <p className={'text-sm font-bold  pt-0.5 leading-[100%]'}>2.5 часа</p>
                        </div>
                    </div>
                    <div className={'w-full rounded-lg overflow-hidden h-72'}>
                        <img className={'h-full object-cover'} src={`${server}/${tour?.photo}`}/>
                    </div>
                    <p className={'text-sm'}>{tour?.description}</p>
                </div>
                <p className={'text-xl font-bold my-4'}>Достопримечательности</p>
                <div className={'flex items-center mb-4 gap-8'}>
                    {tabs=='grid'?<div className={'flex items-center transition-all duration-300 gap-2 border-orrange border-b-2 pb-0.5'}>
                        <img src={table_active}/>
                        <p className={'text-orrange font-bold '}>Сетка</p>
                    </div>:<div onClick={()=>{setTabs('grid')}} className={'flex items-center gap-2 border-transparent border-b-2 pb-0.5'}>
                        <img src={table}/>
                        <p className={'text-[#6B6B6B] font-bold '}>Сетка</p>
                    </div>}
                    {tabs=='map'?<div className={'flex items-center transition-all duration-300 gap-2 border-orrange border-b-2 pb-0.5'}>
                        <img src={map_tab_active}/>
                        <p className={'text-orrange font-bold '}>Карта</p>
                    </div>:<div onClick={()=>{setTabs('map')}} className={'flex items-center gap-2 border-transparent border-b-2 pb-0.5'}>
                        <img src={map_tab}/>
                        <p className={'text-[#6B6B6B] font-bold '}>Карта</p>
                    </div>}

                </div>
                {tabs=='grid'?<div className={'flex flex-col mt-4 gap-8'}>
                    {places.map((place,counter)=>{
                        if(counter<tour?.places?.length){
                            return(
                                <PlaceBanner {...place}></PlaceBanner>
                            )
                        }
                    })}
                </div>:<div className={'flex flex-col mt-4 gap-8'}>
                    <button className={'hidden'} id={'aue'} onClick={() => {
                        push(`/places[0]/${activeBalloonId}`)
                    }}>some
                    </button>
                    <YMaps enterprise
                           query={{
                               apikey: 'a321da86-701d-4977-9102-a74a167bb7aa',
                           }}

                    >
                        <Map width={'100%'} height={window.innerHeight}
                            modules={["multiRouter.MultiRoute"]}
                            state={mapState}
                            instanceRef={map}
                            onLoad={addRoute}
                        ></Map>
                    </YMaps>
                </div>}
            </div>
        </Layout>
    );
};

export default TourPage;