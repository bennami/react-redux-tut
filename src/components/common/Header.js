import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () =>{
const activeStyle = {color: '#F15B2A'};
    return(
        <nav>
            <NavLink   to={'/'} activeStyle={activeStyle} exact>home </NavLink>
            {'|'}
            <NavLink   to={'/about'} activeStyle={activeStyle} exact> about</NavLink>
            {'|'}
            <NavLink   to={'/courses'} activeStyle={activeStyle} exact> courses</NavLink>
        </nav>
    )
};
export default Header
