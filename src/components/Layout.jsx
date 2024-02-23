import React from 'react';
import Navbar from "./Navbar";

const Layout = (props) => {
    return (
        <div className={'min-h-screen sm:max-h-screen sm:w-[480px] w-screen h-screen overflow-scroll font-inter bg-white pb-20 sm:pb-24'}>
            <div className={'w-full'}>
                {props.children}
            </div>
            <div className={'fixed sm:max-w-[480px] z-[999] w-screen bottom-0'}>
                <Navbar>
                </Navbar>
            </div>
        </div>
    );
};

export default Layout;