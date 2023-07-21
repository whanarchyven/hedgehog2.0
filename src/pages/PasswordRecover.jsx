import {PassRecover} from "../components/PassRecover";

const RegistrationPage = () => {
    return (
        <div className={'w-full min-h-screen relative flex justify-center items-center overflow-x-hidden flex-wrap bg-white'}>
            <div className={'flex-wrap w-full flex justify-center z-[999]'}>
                <div className={'h-[50vh] flex flex-col items-center justify-center w-full'}>
                    <p className={'font-bold pl-3 my-3 text-black text-4xl font-inter'}>Восстановление пароля</p>
                </div>
                <div className={'w-full rounded-t-2xl flex items-center justify-center h-[50vh] orange-grad'}>
                    <PassRecover />
                </div>
            </div>


        </div>
    )
}

export default RegistrationPage
