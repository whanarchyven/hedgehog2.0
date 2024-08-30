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
import {useGeolocated} from "react-geolocated";
import axios from "axios";
import {server} from "../components/env/env";
import PostGallery from "../components/PostGallery";
import fi from "react-timeago/lib/language-strings/fi";
import done from 'images/done.svg';
import loading_icon from 'images/loading.svg'


const PublicationPage = () => {
    const dispatch = useDispatch();
    const {push} = useHistory()

    const tempDate = '2022-09-26T10:00:00.301Z'

    const time = new Date();
    const secondsFull = Math.floor((new Date(tempDate).valueOf() - new Date().valueOf()) / 1000)
    time.setSeconds(secondsFull)

    const [file, setFile] = useState()
    const [coordinates, setCoordinates] = useState([])
    const [location, setLocation] = useState('location')
    const [caption, setCaption] = useState('')

    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => {
        if (file) {
            let keys = Object.keys(file)
            let temp = [];
            keys.map((key) => {
                temp.push(URL.createObjectURL(file[key]))
            })
            setImageUrl([...temp].join('|'))
        }
    }, [file])

    const [textAreaHeight, setTextAreaHeight] = useState(0)

    function handleChange(event) {
        const height = event.target.scrollHeight;
        const rowHeight = 24;
        const trows = Math.ceil(height / rowHeight) - 1;
        if (trows > textAreaHeight) {
            setTextAreaHeight(trows)
        }
        setCaption(event.target.value)
    }

    const {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 50,
        });
    const {isAuth, user, access} = useAuth();

    const [geoLocationFlag, setGeoLocationFlag] = useState(false)

    const [loading,setLoading]=useState(false);

    return isAuth ? (
        <Layout>
            <div className={'w-full h-24 bg-orrange rounded-b-[50px] px-5 relative flex items-center justify-start'}>
                <p className={'text-cBlack font-bold text-2xl font-inter'}>Новое событие!</p>
            </div>
            <div className={'mt-5 px-5'}>
                {imageUrl ? <PostGallery disableMap={true} removeServerPrefix imagesUrl={imageUrl}></PostGallery> :
                    <DragNDrop setFile={setFile}></DragNDrop>}
                <p className={'font-bold mt-5 text-xl'}>Опишите событие</p>
                <textarea className={'w-full rounded-lg font-inter mt-4 border-2 p-2'} rows={textAreaHeight} onChange={handleChange}
                          placeholder={'Напишите что-нибудь'}></textarea>
                <Button outlined className={'mt-4'} callback={() => {
                    setGeoLocationFlag(!geoLocationFlag)
                }}>{geoLocationFlag ? <div className={'flex items-center gap-3'}><p>Готово!</p><img src={done}/>
                </div> : 'Определить местоположение'}</Button>
                <Button className={'mt-4'} callback={() => {
                    if(!loading) {
                        setLoading(true);
                        const reqst = new FormData();
                        reqst.append('caption', caption)
                        reqst.append('location', 'Москва')
                        reqst.append('xCoord', coords.longitude.toString())
                        reqst.append('yCoord', coords.latitude.toString())
                        for (let i = 0; i < file.length; i++) {
                            reqst.append(`image${i}`, file[i]);
                        }

                        axios.post(`${server}/posts/add/`, reqst, {headers: {Authorization: access}}).then((response) => {
                            console.log(response);
                            alert('Событие успешно опубликовано!');
                            push('/feed')
                        })
                    }

                }}>{!loading?<p>Опубликовать</p>:<img src={loading_icon} className={'animate-spin w-6 aspect-square'}/>}</Button>
            </div>
        </Layout>
    ) : (
        <Redirect to="/login"/>

    )
}

export default PublicationPage
