import { Login } from 'components/Login';
import { Link } from 'react-router-dom';
import logo from 'images/login.png'

const LoginPage = () => {
    return (
        <div className={'w-screen sm:max-w-[480px] min-h-screen relative flex justify-center items-center overflow-x-hidden flex-wrap bg-orrange'}>
            <div className={'flex-wrap w-full flex flex-col gap-12 items-center justify-center z-[999]'}>
                <img src={logo} className={'w-32'}/>
                <div className={'w-96 p-7 px-10 rounded-2xl flex flex-col gap-2 bg-white'}>
                    <p className={'text-3xl text-cBlack font-inter font-semibold'}>Войти в аккаунт</p>
                    <p className={'text-xl text-cBlack font-inter font-light'}>Введите данные</p>
                    <Login />
                </div>
            </div>


        </div>
    )
}

export default LoginPage
