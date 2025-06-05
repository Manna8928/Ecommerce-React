import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Logo from "../assets/shoppingLogo.svg";

const Navbar = () => {
    return (
        <div className='flex gap-4 h-[15%] justify-between m-5'>

            <img src={Logo} style={{width:"4rem"}}/>
            <div className='flex gap-10 h-[10%] items-center justify-center '>
                <div>
                    <Button variant="text">Home</Button>
                    <Button variant="text">Shop</Button>
                    <Button variant="text">About</Button>
                    <Button variant="text">Contact</Button> 
                </div>
                <Button variant="contained" sx={{bgcolor: "red"}}>Login</Button>
            </div>
        </div>
    )
}

export default Navbar