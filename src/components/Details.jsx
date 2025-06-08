import { Box, Button, Typography, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';;
import { useParams } from 'react-router'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import './detail.css'
import CustomizedTab from './CustomizedTab';

export default function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState({})

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setDetails(data));
  }, [])
  console.log("details data", details)

  const rate = details.rating

  return (
    <>
      <Box class="detailsMain">
        <img src={details.images} alt={details.title} className='productImg' />
        <Box>
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>{details.brand}</Typography>
          <Typography variant='h6'>{details.title}</Typography>
          {details.rating}
          <Rating name="half-rating-read" defaultValue={rate} precision={0.5} readOnly />
          <Typography variant='body2' className='price'>
            MRP<span style={{ textDecoration: "line-through 1.2px " }}> {details.price}</span>
            <span style={{ fontWeight: 'bold' }}> {(details.price * details.discountPercentage / 100).toFixed(2)}</span>
            <span style={{ color: "white" }}>{details.discountPercentage} %</span>
          </Typography>
          <Button variant='contained' size="medium">Add To Cart</Button>

        </Box>
      </Box>

      {!!details && <CustomizedTab details={details} id={details.id} />}
    </>
  )
}
