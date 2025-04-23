
import React from 'react';
import './MyNetworkSidebarOption.css';

const MyNetworkSidebarOption = ({Icon,title, onClick}) => {
    return (
        <div className='myNetworkSidebar__option' onClick={onClick}>
            {/* <Icon className='myNetworkSidebar__icon'/> */}
            <Icon className='myNetworkSidebar__icon'/>
            <h2>{title}</h2>
        </div>
    );
};

export default MyNetworkSidebarOption;