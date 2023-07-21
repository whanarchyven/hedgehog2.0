import React from 'react';

const ProgressBar = ({value,maximum}) => {
    return (
        <div className={'w-full h-4 bg-white rounded-full p-1'}>
            <div className={'bg-black h-full rounded-full'} style={{width:`${value/maximum*100}%`}}>

            </div>
        </div>
    );
};

export default ProgressBar;