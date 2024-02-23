import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {setUser} from 'store/slices/userSlice';
import {useEffect,useState} from "react";
import CustomInput from "./UI/CustomInput";
import emailIcon from "../images/icons/email.svg";
import passIcon from "../images/icons/password.svg";
import personIcon from "images/icons/person.svg"
import DragNDrop from "./UI/DragNDrop";
import {server} from "./env/env";

const Register = () => {
    const dispatch = useDispatch();
    const {push} = useHistory();


    const handleRegister = (email, password,name,surname,avatar) => {

        const formData=new FormData()
        formData.append("image", avatar[0]);
        formData.append('username',email);
        formData.append('password',password);
        formData.append('name',name);
        formData.append('surname',surname);

        axios.post(`${server}/users/register/`, formData)
            .then(function (response) {
                console.log(response);
                dispatch(setUser({
                    access: response.data.token,
                    user: JSON.stringify(response.data.user),
                }))
                localStorage.setItem('userAccess', response.data.token);
                localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                console.log(localStorage.getItem("userAccess"));
                console.log(localStorage.getItem("userInfo"));
                push('/')

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
                refresh: localStorage.getItem("userInfo"),
            }))
            console.log(loggedInUser)
            push('/')
        }
    },[])

    const [email, setEmail] = useState('');
    const [name,setName]=useState('')
    const [surname,setSurname]=useState('')
    const [pass, setPass] = useState('');
    const [avatar,setAvatar]=useState(null)


    return (
        <div className={'w-full flex items-center px-2 py-6 flex-col'}>
            <div className={'grid grid-cols-1 gap-5 justify-center items-center'}>
                <div className={'flex flex-col items-center'}>
                    <CustomInput value={name} Setter={setName} placeholder={'Имя'} icon={personIcon} ></CustomInput>
                    <CustomInput value={surname} Setter={setSurname} placeholder={'Фамилия'} icon={personIcon} ></CustomInput>
                    <CustomInput value={email} Setter={setEmail} placeholder={'Email'} icon={emailIcon} ></CustomInput>
                    <CustomInput value={pass} type={'password'} Setter={setPass} placeholder={'Пароль'} icon={passIcon}></CustomInput>
                </div>
                <div className={'flex items-center p-2 justify-start h-full flex-col'}>
                    <p className={'text-black mb-2 font-[500] text-xl'}>Аватар:</p>
                    {avatar?<div className={'w-full mb-3 aspect-square border-2 border-white rounded-full'}>
                            {avatar?<img className={'w-full rounded-full  h-full object-cover'}
                                         src={URL.createObjectURL(avatar[0])}/>:null}
                        </div>:
                        <div className={'bg-white flex rounded-lg overflow-hidden items-center justify-center'}>
                            <DragNDrop file={avatar} setFile={setAvatar}></DragNDrop>
                        </div>}
                </div>
                <button className={'w-full p-3 text-white my-8 font-[500] text-xl font-inter bg-black rounded-full'}
                        onClick={() => handleRegister(email, pass,name,surname,avatar)}
                >
                    Регистрация
                </button>
                <a href={'/login'} className={'font-normal my-3 font-inter text-center w-full mt-4 text-white'}>У меня есть аккаунт <span className={'underline font-bold'}>Войти</span></a>
            </div>

        </div>
    )
}

export  {Register}
