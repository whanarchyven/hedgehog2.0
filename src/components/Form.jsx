import {useState} from 'react';
import CustomInput from "./UI/CustomInput";
import emailIcon from 'images/icons/email.svg'
import passIcon from 'images/icons/password.svg'

const Form = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className={'w-full flex items-center px-5 flex-col'}>
            <CustomInput value={email} Setter={setEmail} placeholder={'Email'} icon={emailIcon} ></CustomInput>
            <CustomInput value={pass} Setter={setPass} placeholder={'Password'} icon={passIcon}></CustomInput>
            <button className={'w-full h-12 text-white mt-8 font-[500] text-xl font-inter bg-black rounded-full'}
                    onClick={() => handleClick(email, pass)}
            >
                {title}
            </button>
            <a className={'font-bold font-inter mt-4 underline text-white'}>Забыл пароль</a>
            <a className={'font-normal font-inter mt-4 text-white'}>Нет аккаунта? <span className={'underline font-bold'}>Регистрация</span></a>
        </div>
    )
}

export {Form}
