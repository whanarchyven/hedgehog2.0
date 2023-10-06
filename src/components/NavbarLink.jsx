import React from 'react';
import {classList} from "./helpers/classList";

import {useHistory} from "react-router-dom";

const NavbarLink = ({navbarItem}) => {
    const {push}=useHistory()
    return (
        <a className={'w-7 flex flex-col items-center justify-center'} onClick={()=>{
            push(navbarItem.link)
        }}>
            {window.location.pathname==navbarItem.link?<img className={'w-full aspect-square'} src={navbarItem.activeImg}/>:<img className={'w-full aspect-square'} src={navbarItem.passiveImg}/>}
            {/*<p className={classList('font-inter font-bold text-sm lowercase',window.location.pathname==navbarItem.link?'text-orrange':'text-grrey')}>{navbarItem.name}</p>*/}
        </a>
    );
};

export default NavbarLink;