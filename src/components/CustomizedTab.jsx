import React from 'react';
import { NavLink, Outlet, Route, Routes } from 'react-router';
import { TabContext } from '../TabContext';

import './tab.css'
const CustomizedTab = ({ details, id }) => {

    return (
        <TabContext.Provider value={{ details }}>
            <div className='tabMain'>
                <div className='tabButton'>
                    <NavLink to={`/details/${id}/description`}>Description</NavLink>

                    <NavLink to={`/details/${id}/return`}>Return Policy</NavLink>

                    <NavLink to={`/details/${id}/additional`}>Additional Info</NavLink>
                </div>

                <div className='tabContent'>
                    <Outlet />
                </div>
            </div>
        </TabContext.Provider>
    )
}

export default CustomizedTab