import React from 'react';
import feed from 'images/icons/feed.svg'
import feed_active from 'images/icons/feed_active.svg'
import map from 'images/icons/map.svg'
import map_active from 'images/icons/map_active.svg'
import publication from 'images/icons/publication.svg'
import publication_active from 'images/icons/publication_active.svg'
import account from 'images/icons/account.svg'
import account_active from 'images/icons/account_active.svg'
import tours from "images/icons/tours.svg"
import tours_active from "images/icons/tours_active.svg"

import sidebar from "images/sidebar.svg"

import NavbarLink from "./NavbarLink";
import tr from "react-timeago/lib/language-strings/tr";


const Navbar = (currentTab) => {

    const links=[
        {
            name:'новости',
            activeImg:feed_active,
            passiveImg:feed,
            link:'/feed'
        },
        {
            name:'карта',
            activeImg:map_active,
            passiveImg:map,
            link:'/map'
        },
        {
            name:'публикация',
            activeImg:publication_active,
            passiveImg:publication,
            isHidden:true,
            link:'/publication'
        },
        {
            name:'турмаршруты',
            activeImg:tours_active,
            passiveImg:tours,
            link:'/tours'
        },{
            name:'профиль',
            activeImg:account_active,
            passiveImg:account,
            link:'/account'
        }
    ]

    return (
        <div className={'w-full  p-2 rounded-t-xl h-20 relative'}>
            <img className={'absolute left-0 bottom-0 w-full '} src={sidebar}/>
            <div className={'absolute left-0 bottom-0 w-full h-full items-center grid grid-cols-5'}>
                {links.map((item)=>{
                    return (<div className={'flex items-center justify-center'}>
                        <NavbarLink navbarItem={item}></NavbarLink>
                    </div>)
                })}
            </div>
        </div>
    );
};

export default Navbar;