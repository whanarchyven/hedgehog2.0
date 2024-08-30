import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {setUser} from 'store/slices/userSlice';
import {useEffect,useState} from "react";
import CustomInput from "./UI/CustomInput";
import emailIcon from "../images/icons/email.svg";
import passIcon from "../images/icons/password.svg";
import {server} from "./env/env";

const Login = () => {
    const dispatch = useDispatch();
    const {push} = useHistory();


    const handleLogin = (email, password) => {
        axios.post(`${server}/users/login/`, {
            username: email,
            password: password,
        },)
            .then(function (response) {
                console.log(response.data.token);
                dispatch(setUser({
                    access: response.data.token,
                    user: JSON.stringify(response.data.user),
                }))
                localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                localStorage.setItem('userPass',password)
                push('/')

            })
            .catch(function (error) {
                console.log(error);
                console.log(`${server}/users/login/`)
                alert("Неверный логин или пароль")
            });
    }

    useEffect(()=>{
        const oldDataPass=localStorage.getItem("userPass")
        const oldDataUser=JSON.parse(localStorage.getItem("userInfo"))
        if (oldDataPass&&oldDataUser) {
            console.log(oldDataUser.username,oldDataPass)
            axios.post(`${server}/users/login/`, {
                username: oldDataUser.username,
                password: oldDataPass,
            },)
                .then(function (response) {
                    console.log(response.data.token);
                    dispatch(setUser({
                        access: response.data.token,
                        user: JSON.stringify(response.data.user),
                    }))
                    localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                    localStorage.setItem('userPass',oldDataPass)
                    push('/')

                })
                .catch(function (error) {
                    console.log(error);
                    console.log(`${server}/users/login/`)
                    alert("Неверный логин или пароль")
                })
            // dispatch(setUser({
            //     access: localStorage.getItem("userAccess"),
            //     user: localStorage.getItem("userInfo"),
            // }))
            // console.log(loggedInUser)
            // push('/')
        }
    },[])

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className={'w-full flex items-center flex-col'}>
            <CustomInput value={email} Setter={setEmail} placeholder={'Имя пользователя'} ></CustomInput>
            <CustomInput type={'password'} value={pass} Setter={setPass} placeholder={'Пароль'} ></CustomInput>
            <button className={'w-full text-white mt-8 p-4 text-base font-inter bg-cBlack font-semibold uppercase rounded-2xl'}
                    onClick={() => handleLogin(email, pass)}
            >
                Войти в аккаунт
            </button>
            <a href={'/register'} className={'font-normal font-inter mt-4 text-cBlack'}>Нет аккаунта? <span className={'underline font-bold'}>Регистрация</span></a>
        </div>
    )
}

export  {Login}
