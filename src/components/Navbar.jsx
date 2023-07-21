import React from 'react';
import feed from 'images/icons/feed.svg'
import feed_active from 'images/icons/feed_active.svg'
import map from 'images/icons/map.svg'
import map_active from 'images/icons/map_active.svg'
import publication from 'images/icons/publication.svg'
import publication_active from 'images/icons/publication_active.svg'
import account from 'images/icons/account.svg'
import account_active from 'images/icons/account_active.svg'
import NavbarLink from "./NavbarLink";


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
            link:'/publication'
        },{
            name:'профиль',
            activeImg:account_active,
            passiveImg:account,
            link:'/account'
        }
    ]

    return (
        <div className={'w-full navbar-shadow bg-white p-2 rounded-t-xl h-20 justify-items-center gap-4 grid grid-cols-4'}>
            {links.map((item)=>{
                return (<NavbarLink navbarItem={item}></NavbarLink>)
            })}
        </div>
    );
};

export default Navbar;