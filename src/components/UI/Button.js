import React from 'react';
import {classList} from "../helpers/classList";

const Button = (props) => {
    return (
        <div
            className={classList('p-3 bg-orrange font-inter text-white font-bold flex items-center rounded-full justify-center', props.className ? props.className : '')}
            onClick={() => {
                props.callback()
            }}>
            {props.children}
        </div>
    );
};

export default Button;