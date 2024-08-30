import React from 'react';
import {classList} from "../helpers/classList";

const Button = (props) => {
    return (
        <div
            className={classList('p-3 font-inter font-bold flex items-center rounded-lg justify-center',props.outlined?'border-cBlack border-2 text-cBlack bg-transparent':'bg-orrange text-cBlack', props.className ? props.className : '')}
            onClick={() => {
                props.callback()
            }}>
            {props.children}
        </div>
    );
};

export default Button;