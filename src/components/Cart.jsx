import { Box, Button, Grid, Tooltip } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../stylesheet/cart.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CommerceContext } from '../context/CommerceContext';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { NavLink, useNavigate } from 'react-router';

const Cart = () => {

    const { totalCartItems, cart, setDrawerOpen, setCart } = useContext(CommerceContext);
    const [shipping, setShipping] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { }, [])
    const cartItemOriginalValue = useCallback((id) => {
        console.log("inside cart item value at ", id)
        let total = 0;
        total = total + (cart[id].quantity * cart[id].originalMRP);

        return total
    }, [cart])

    const cartItemDiscountValue = useCallback((id) => {
        console.log("inside cart item value at ", id)
        let total = 0;
        total = total + (cart[id].quantity * cart[id].discountMRP);
        total = total.toFixed(2);
        return total
    }, [cart])

    const bagOriginalMrpValue = useMemo(() => {

        let total = 0;
        for (let i in cart)
            total = total + (cart[i].quantity * cart[i].originalMRP);
        // total=total + (total > 10 ? 0 : 1.5)
        total = total.toFixed(2);
        return total
    }, [cart])

    const bagDiscountValue = useMemo(() => {
        console.log("calculate total cart ")
        let total = 0;
        for (let i in cart)
            total = total + (cart[i].quantity * cart[i].discount);
        total = total.toFixed(2);
        return total
    }, [cart])

    const grandTotal = useMemo(() => {
        let total = 0;
        console.log("original ", bagOriginalMrpValue, "discount ", bagDiscountValue)
        total = Math.round((bagOriginalMrpValue - bagDiscountValue) * 100) / 100;
        total < 10 ? setShipping(true) : setShipping(false);
        console.log("toatl 1 ", total)
        total = total + (total > 10 ? 0 : 1.5);
        console.log("toatl 2 ", total)
        return total
    }, [bagOriginalMrpValue, bagDiscountValue])

    const emptyBagHandle = useCallback(() => {
        return <div className='emptyBag'>
            <img src="../src/assets/emptyBag.webp" />
            <Box>Your Shopping Bag is Empty</Box>
            <NavLink to={"/"}>
                <Button variant='contained' className='shoppingBtn' onClick={() => setDrawerOpen(false)}>
                    Start Shopping</Button>
            </NavLink>

        </div>
    }, [])

    return (
        <Grid container className="cartSection" flexDirection={'column'}>

            <Grid container className="cartOverview" justifyContent={'space-between'}>
                <Grid container size={6} spacing={2}>
                    <ArrowBackIcon onClick={() => setDrawerOpen(false)} sx={{ cursor: 'pointer' }} />
                    <Box  >Bag</Box>
                    <Box sx={{ color: "rgba(237, 237, 149,0.6)" }}>{totalCartItems ? totalCartItems : "No"} items</Box>
                </Grid>
                <Grid >View Wishlist</Grid>
            </Grid>

            {!totalCartItems ? emptyBagHandle() :


                <Grid className="cartContent">
                    <Grid>
                        {Object.values(cart).map((item) => {
                            return <Grid className="cartItem" key={item.detail.id} >
                                <Grid container justifyContent={'space-between'}>
                                    <Box className='cartItemImgBox'>
                                        <img src={item.detail.images} />
                                    </Box>
                                    <Grid size={6}>
                                        <Box>{item.detail.brand}</Box>
                                        <Box>{item.detail.title}</Box>
                                        <Box>Quantity : {item.quantity}</Box>
                                    </Grid>
                                    <DeleteIcon />
                                </Grid>
                                <Grid container justifyContent={'space-between'} sx={{ borderTop: " 2px rgb(162, 142, 142) solid", mt: "15px", p: "10px" }}>
                                    <Box>You Pay</Box>
                                    <Grid container spacing={1}>

                                        <Box className="originalPrice">${cartItemOriginalValue(item.detail.id)}</Box>
                                        <Box sx={{ fontWeight: "bold" }}>${cartItemDiscountValue(item.detail.id)}</Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        })}
                    </Grid>
                    <Grid className="priceDetails" >
                        <Box sx={{ fontSize: "25px", mb: "15px" }}>Price Details</Box>
                        <Grid>
                            <Grid container justifyContent={"space-between"}>
                                <Box>Bag MRP ({totalCartItems} items)</Box>
                                <Box>${bagOriginalMrpValue}</Box>
                            </Grid>
                            <Grid container justifyContent={"space-between"}>
                                <Tooltip title="Free shipping above $10">
                                    <Box>Shipping
                                        <InfoOutlineIcon fontSize='small' />
                                    </Box>
                                </Tooltip>
                                <Box>
                                    {!shipping ? "Free" : "$1.5"}
                                </Box>
                            </Grid>
                            <Grid container justifyContent={'space-between'}>
                                <Box>Bag Discount</Box>
                                <Box>${bagDiscountValue}</Box>
                            </Grid>
                            <Grid container justifyContent={"space-between"} sx={{ fontSize: "25px", my: "15px", fontWeight: "bold" }}>
                                <Box>You Pay</Box>
                                <Box>${grandTotal}</Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
            {!!totalCartItems &&
                <Grid container justifyContent={'space-between'} className="grandTotal">
                    <Grid>
                        <Box>${grandTotal}</Box>
                        <Box sx={{ color: "rgb(162, 142, 142)" }}>Grand Total</Box>
                    </Grid>
                    <Button variant='contained' sx={{ backgroundColor: "red" }} onClick={() => {
                        setDrawerOpen(false)
                        setCart({})
                        navigate("/payment")
                    }}>
                        Proceed
                        <KeyboardDoubleArrowRightIcon />
                    </Button>
                </Grid>
            }

        </Grid>
    )
}

export default Cart