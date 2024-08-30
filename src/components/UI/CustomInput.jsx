import React from 'react';

const CustomInput = ({value, Setter, title, placeholder, icon, type}) => {
    return (
        <div className={'w-full my-2 rounded-full bg-white border-2  p-4 border-cBlack rounded-2xl flex relative items-center justify-between'}>
            <input type={type ? type : 'text'} placeholder={placeholder} value={value} onChange={(event) => {
                Setter(event.target.value)
            }}
                   className={'placeholder:font-bold placeholder:text-sm placeholder:text-[#7B6A64]  text-base  font-inter font-medium h-full  outline-0 w-full placeholder:text-black bg-transparent'}/>
            {icon && <div className={'w-[20%] h-full flex items-center justify-end'}>
                <img className={'w-5 aspect-square'} src={icon}/>
            </div>}
            {type=='password'&&value==''&&<a className={'font-semibold text-cBlack whitespace-nowrap'}>Забыли пароль?</a>}
        </div>
    );
};

export default CustomInput;