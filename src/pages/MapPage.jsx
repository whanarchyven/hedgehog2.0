import {Redirect, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {useAuth} from 'hooks/use-auth';
import {removeUser} from 'store/slices/userSlice'
import Layout from "../components/Layout";
import {Clusterer, Map, Placemark, YMaps, GeolocationControl} from "@pbe/react-yandex-maps";
import {useEffect, useState} from "react";
import axios from "axios";
import placemark from "images/placemark.png"
import {server} from "../components/env/env";


const MapPage = () => {
    const dispatch = useDispatch();
    const {push} = useHistory()
    const {isAuth, email, access} = useAuth();

    const [posts, setPosts] = useState(null)

    const [activeBalloonId,setActiveBalloonId]=useState('')


    const fetchUsersPosts = async () => {
        await axios.get(`${server}/posts/`, {headers: {Authorization: access}}).then((res, err) => {
            setPosts(res.data)
        })
    }

    useEffect(() => {
        fetchUsersPosts()
    }, [])


    let clusterPoints = [];
    if (isAuth) {
        return (
            <Layout>
                <button className={'hidden'} id={'aue'} onClick={() => {
                    push(`/post/${activeBalloonId}`)
                }}>some
                </button>
                <YMaps enterprise
                       query={{
                           apikey: 'a321da86-701d-4977-9102-a74a167bb7aa',
                       }}

                >
                    <Map width={'100%'} height={window.innerHeight}
                         modules={["control.ZoomControl", "control.FullscreenControl", 'geoObject.addon.balloon', 'geoObject.addon.hint']}
                         defaultState={{
                             center: [56.139918, 47.247728],
                             zoom: 9,
                             controls: ["zoomControl", "fullscreenControl"],
                         }}
                    >
                        <GeolocationControl options={{
                            float: "right", position: {
                                bottom: '200px',
                                right: '10px'
                            }, maxWidth: '20px'
                        }}/>
                        <Clusterer
                            options={{
                                preset: "islands#invertedOrangeClusterIcons",
                                groupByCoordinates: false,
                            }}
                        >

                            {posts?.map((post) => {
                                return (
                                    <Placemark key={post.id} options={{
                                        iconImageHref: `${server}/placemark.svg`,
                                        iconLayout: "default#image",
                                        iconImageSize: [39, 52],
                                    }} defaultGeometry={[post?.yCoord, post?.xCoord]} properties={{
                                        balloonContentHeader: `<div class="flex justify-center flex-col"><h2 class="text-xl font-bold">${post.caption.split(' ').slice(0, 5).join(' ') + ' ...'}</h2><p class="text-sm font-bold">${post.nickname}</p><img class="rounded-xl border-2 border-orrange w-60 aspect-square object-cover " src="${server}/${post.image.split('|')[0]}"/>
<button onclick="document.getElementById('aue').click()" class="p-3 mt-3 w-60 bg-orrange font-inter text-white font-bold flex items-center rounded-full justify-center">Смотреть полностью</button></button></div>`,
                                        balloonAutoPan: true,
                                        openBalloonOnClick: true,
                                    }} onClick={()=>{setActiveBalloonId(post._id)}}>
                                    </Placemark>
                                )
                            })}
                        </Clusterer>
                    </Map>
                </YMaps>
            </Layout>
        )
    } else {
        push('/login')
    }
}

export default MapPage
