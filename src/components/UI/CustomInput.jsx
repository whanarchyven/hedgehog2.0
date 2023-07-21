import React from 'react';

const CustomInput = ({value,Setter,title,placeholder,icon,type}) => {
    return (
        <div className={'w-full my-2 h-12 px-4 rounded-full bg-white flex relative items-center justify-between'}>
            <input type={type?type:'text'} placeholder={placeholder} value={value} onChange={(event)=>{Setter(event.target.value)}} className={'placeholder:font-bold placeholder:text-sm font-inter font-medium h-full focus:border-0 outline-0 w-[80%] placeholder:text-black bg-transparent'}/>
            <div className={'w-[20%] h-full flex items-center justify-end'}>
                <img className={'w-5 aspect-square'} src={icon}/>
            </div>
        </div>
    );
};

export default CustomInput;