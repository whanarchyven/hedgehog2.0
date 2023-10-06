import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import Post from "../components/Post";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../hooks/use-auth";
import {server} from "../components/env/env";
import rating from "images/rate.png"
import Button from "../components/UI/Button";
import {getLevel} from "../components/helpers/getLevel";

const RatingPage = (props) => {
    const push=useHistory()

    return (
        <Layout>
            <div className={'w-full p-3 min-h-screen h-full gap-5 flex items-center flex-col justify-center'}>
                <p className={'font-inter font-bold text-center text-2xl'}>Создавай события, оценивай чужие,- будь активным и <span className={'text-orrange'}>получай призы!</span></p>
                <img className={'rounded-lg border-orrange border-2'} src={rating}/>
                <Button className={'w-full'} callback={()=>{push.goBack()}}>Вернуться</Button>
            </div>
        </Layout>
    );
};

export default RatingPage;