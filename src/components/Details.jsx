import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import '../stylesheet/detail.css';
import CustomizedTab from './CustomizedTab';
import Rating from './Rating';
import ReviewCard from './ReviewCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faRotateLeft } from '@fortawesome/free-solid-svg-icons'


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
    console.log("details data", details)
  }, [])


  const writeReviews = details?.reviews?.map((review, index) =>
    <ReviewCard key={index} review={review} />)

  return (
    <>
      <Box className="detailsMain">
        <Box>
          <img src={details.images} alt={details.title} className='productImg' />
        </Box>
        <Box className="details">

          <Box className="detailContent">
            <Typography variant='h5' sx={{ fontWeight: "bold" }}>{details.brand}</Typography>
            <Typography variant='h6'>{details.title}</Typography>
            <Box className="rating">
              <Rating rating={details.rating} />{details.rating}/5
            </Box>

            {/* <Rating name="half-rating-read" defaultValue={rate} precision={0.5} readOnly /> */}
            <Typography variant='body2' className='price'>
              MRP<span style={{ textDecoration: "line-through 1.2px " }}> {details.price}</span>
              <span style={{ fontWeight: 'bold' }}> {(details.price * details.discountPercentage / 100).toFixed(2)}</span>
              <span style={{ color: "white" }}>{details.discountPercentage} %</span>
            </Typography>
            <Button variant='contained' size="medium" sx={{ width: "160px" }}>Add To Cart</Button>

          </Box>
          <Grid container className="generalProductInfo" >
            <Grid size={4}>
              <span className='generalFont'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>100% Genuine Products
            </Grid>
            <Grid size={4}>
              <span className='generalFont'>
                <FontAwesomeIcon icon={faRotateLeft} />
              </span>Easy Return Policy
            </Grid>
            <Grid size={4}>
              Sold By: SHOP-Retail..</Grid>
          </Grid>
        </Box>
      </Box>
      <Box>

        <div style={{ margin: "20px 2px", fontSize: "20px", color: "white" }}>Product Description</div>
        {!!details && <CustomizedTab details={details} id={details.id} />}
      </Box>
      <Box sx={{width: "80%"}}>
        <div style={{ margin: "20px 2px", fontSize: "20px", color: "white" }}>Ratings and Reviews</div>
        <Box className="reviewBox" >
          {!!details?.reviews ? writeReviews : "No reviews yet..."}
        </Box>
      </Box>
    </>
  )
}
