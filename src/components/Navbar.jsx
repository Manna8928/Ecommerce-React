import React from 'react'
import Button from '@mui/material/Button';
import Logo from "../assets/shoppingLogo.svg";
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className='flex gap-4 h-[15%] w-[100vw] justify-between items-center m-3'>

            <NavLink to="/">
                <img src={Logo} style={{ width: "4rem", marginInlineStart: "10px" }} />
            </NavLink>
            <div className='flex gap-10 mr-2 h-[10%] items-center justify-center'>
                <div>
                    <NavLink to="/">
                        <Button variant="text">Home</Button>
                    </NavLink>
                    <Button variant="text">Shop</Button>
                    <Button variant="text">About</Button>
                    <Button variant="text">Contact</Button>
                </div>
                <Button variant="contained" sx={{ bgcolor: "red" }}>Login</Button>
            </div>
        </div>
    )
}

export default Navbar