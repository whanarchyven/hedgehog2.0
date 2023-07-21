import {Redirect, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {useAuth} from 'hooks/use-auth';
import {removeUser, setUser} from 'store/slices/userSlice'
import Layout from "../components/Layout";
import CustomInput from "../components/UI/CustomInput";
import searchIcon from "../images/icons/search.svg";
import {useEffect, useState} from "react";
import DragNDrop from "../components/UI/DragNDrop";
import Button from "../components/UI/Button";
import {usePosition} from "../hooks/use-position";
import { useGeolocated } from "react-geolocated";
import axios from "axios";
import {server} from "../components/env/env";


const PublicationPage = () => {
    const dispatch = useDispatch();
    const {push} = useHistory()

    const tempDate='2022-09-26T10:00:00.301Z'

    const time = new Date();
    const secondsFull = Math.floor((new Date(tempDate).valueOf() - new Date().valueOf()) / 1000)
    time.setSeconds(secondsFull)

    const [file,setFile]=useState()
    const [coordinates,setCoordinates]=useState([])
    const [location,setLocation]=useState('location')
    const [caption,setCaption]=useState('')

    const [imageUrl,setImageUrl]=useState(null)

    useEffect(()=>{
        if(file){
            setImageUrl(URL.createObjectURL(file[0]))
        }
    },[file])

    const [textAreaHeight,setTextAreaHeight]=useState(0)

    function handleChange(event) {
        const height = event.target.scrollHeight;
        const rowHeight = 24;
        const trows = Math.ceil(height / rowHeight) - 1;
        if(trows>textAreaHeight){
            setTextAreaHeight(trows)
        }
        setCaption(event.target.value)
    }

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 50,
        });
    const {isAuth, user,access} = useAuth();

    const [geoLocationFlag,setGeoLocationFlag]=useState(false)

    return isAuth ? (
        <Layout>
            <div className={'w-full h-24 bg-orrange rounded-b-[50px] px-5 relative flex items-center justify-start'}>
                <p className={'text-white font-bold text-3xl font-inter'}>Новая публикация</p>
            </div>
            <div className={'mt-5 px-5'}>
                <p className={'font-bold text-3xl'}>Фото</p>
                {imageUrl?<img className={'my-3 aspect-square object-cover'} src={imageUrl?imageUrl:''}/>:<DragNDrop setFile={setFile}></DragNDrop>}
                <p className={'font-bold text-xl'}>Опишите публикацию</p>
                <textarea className={'w-full mt-4 border-2 p-1'} rows={textAreaHeight} onChange={handleChange} placeholder={'Напишите что-нибудь'}></textarea>
                <Button className={'mt-4'} callback={()=>{setGeoLocationFlag(!geoLocationFlag)}}>{geoLocationFlag?<p>{coords?.latitude} | {coords?.longitude}</p>:'Определить местоположение'}</Button>
                <Button className={'mt-4'} callback={()=>{
                    const reqst=new FormData();
                    reqst.append('caption',caption)
                    reqst.append('location','Чебоксары')
                    reqst.append('xCoord',coords.longitude.toString())
                    reqst.append('yCoord',coords.latitude.toString())
                    reqst.append('image',file[0])

                    axios.post(`${server}/posts/add/`,reqst,{headers:{Authorization:access}}).then((response)=>{
                        console.log(response);
                        alert('Пост успешно опубликован!');
                        push('/feed')
                    })

                }}>Опубликовать</Button>
            </div>
        </Layout>
    ) : (
        <Redirect to="/login" />

    )
}

export default PublicationPage
