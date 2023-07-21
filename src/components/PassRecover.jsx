import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {setUser} from 'store/slices/userSlice';
import {useEffect,useState} from "react";
import CustomInput from "./UI/CustomInput";
import emailIcon from "../images/icons/email.svg";
import passIcon from "../images/icons/password.svg";
import personIcon from "images/icons/person.svg"

const PassRecover = () => {
    const dispatch = useDispatch();
    const {push} = useHistory();


    const handleRegister = (email, password) => {
        axios.post('https://skill-app.ru/api/token/', {
            email: email,
            password: password,
        })
            .then(function (response) {
                console.log(response);
                dispatch(setUser({
                    access: response.data.access,
                    refresh: response.data.refresh,
                }))
                localStorage.setItem('userAccess', response.data.access);
                localStorage.setItem('userRefresh', response.data.refresh);
                console.log(localStorage.getItem("userAccess"));
                console.log(localStorage.getItem("userRefresh"));
                axios.get('https://skill-app.ru/api/course/1/',{
                    headers: {
                        'Authorization': `Bearer ${response.data.access}`
                    }
                }).then((res)=>{
                    if(res.data.tasks[0].done==false){
                        push('/welcome')
                    }
                    else{
                        push('/')
                    }
                })

            })
            .catch(function (error) {
                console.log(error);
                alert("Неверный логин или пароль")
            });
    }

    useEffect(()=>{
        const loggedInUser=localStorage.getItem("userAccess")
        if (loggedInUser) {
            dispatch(setUser({
                access: localStorage.getItem("userAccess"),
                refresh: localStorage.getItem("userRefresh"),
            }))
            console.log(loggedInUser)

            axios.get('https://skill-app.ru/api/course/1/',{
                headers: {
                    'Authorization': `Bearer ${loggedInUser}`
                }
            }).then((res)=>{
                if(res.data.tasks[0].done==false){
                    push('/welcome')
                }
                else{
                    push('/')
                }
            })
        }
    },[])

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className={'w-full flex items-center px-5 flex-col'}>
            <CustomInput value={email} Setter={setEmail} placeholder={'Email'} icon={emailIcon} ></CustomInput>
            <button className={'w-full h-12 text-white mt-8 font-[500] text-xl font-inter bg-black rounded-full'}
                    onClick={() => handleRegister(email, pass)}
            >
                Отправить заявку на сброс
            </button>
            <a href={'/login'} className={'font-medium font-inter mt-4 text-white'}>Вспомнил пароль! <span className={'underline font-bold'}>Войти</span></a>

        </div>
    )
}

export  {PassRecover}
