import React from 'react';
import Navbar from "./Navbar";

const Layout = (props) => {
    return (
        <div className={'min-h-screen font-inter bg-white pb-20 w-full'}>
            <div>
                {props.children}
            </div>
            <div className={'fixed w-full left-0 bottom-0'}>
                <Navbar>
                </Navbar>
            </div>
        </div>
    );
};

export default Layout;