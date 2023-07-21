import { Login } from 'components/Login';
import { Link } from 'react-router-dom';
import logo from 'images/logo.png'

const LoginPage = () => {
    return (
        <div className={'w-full min-h-screen relative flex justify-center items-center overflow-x-hidden flex-wrap bg-white'}>
            <div className={'flex-wrap w-full flex justify-center z-[999]'}>
                <div className={'h-[50vh] flex flex-col items-center justify-center w-full'}>
                    <p className={'font-bold my-3 text-black text-4xl font-inter'}>Войти</p>
                    <img src={logo} className={'w-72'}/>
                </div>
                <div className={'w-full rounded-t-2xl flex items-center justify-center h-[50vh] orange-grad'}>
                    <Login />
                </div>
            </div>


        </div>
    )
}

export default LoginPage
