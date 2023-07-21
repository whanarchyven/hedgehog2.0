import { Login } from 'components/Login';
import { Link } from 'react-router-dom';
import logo from 'images/logo.png'
import {Register} from "../components/Register";

const RegistrationPage = () => {
    return (
        <div className={'w-full min-h-screen relative flex justify-center items-center overflow-x-hidden flex-wrap bg-white'}>
            <div className={'flex-wrap w-full flex justify-center z-[999]'}>
                <div className={'h-[50vh] flex flex-col items-center justify-center w-full'}>
                    <p className={'font-bold my-3 text-black text-4xl font-inter'}>Регистрация</p>
                    <img src={logo} className={'w-72'}/>
                </div>
                <div className={'w-full rounded-t-2xl flex items-center justify-center min-h-[50vh] py-5 orange-grad'}>
                    <Register />
                </div>
            </div>


        </div>
    )
}

export default RegistrationPage
