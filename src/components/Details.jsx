import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import '../stylesheet/detail.css';
import CustomizedTab from './CustomizedTab';
import Rating from './Rating';
import ReviewCard from './ReviewCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { CommerceContext } from '../context/CommerceContext';


export default function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const { token, setModal, cart, SetCart, productList } = useContext(CommerceContext)
  const { products } = productList
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setDetails(data));
    console.log("details data", details)
  }, [])

  useEffect(() => {
    console.log("loader ", loader)
    !!details.images && setLoader(false)
  }, [details.images])

  const writeReviews = details?.reviews?.map((review, index) =>
    <ReviewCard key={index} review={review} />)

  const addToCart = useCallback(() => {
    if (!token)
      setModal(true)
    // if (cart[id])
    //   {SetCart(prev => ({
    //     ...prev,
    //     id : {
    //       ...prev[id],
    //       quantity:[...prev[id]].quantity+1
    //     }
    //   }))}
    // else 
    // {
    //   SetCart(prev => {
    //     return {
    //       ...prev,
    //       id: {
    //           detail:products[id],
    //           quantity:1
    //           }
    //     }
    //   })}

  }, [setModal, token])

  return (
    <>
      {
        loader ?
          <img src="../src/assets/loader.gif" alt="Loading Image..." /> :
          <Box className="detailSection">
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

                  <Typography variant='body2' className='price'>
                    MRP<span style={{ textDecoration: "line-through 1.2px " }}> {details.price}</span>
                    <span style={{ fontWeight: 'bold' }}> {(details.price * details.discountPercentage / 100).toFixed(2)}</span>
                    <span style={{ color: "white" }}>{details.discountPercentage} %</span>
                  </Typography>
                  <Button variant='contained' size="medium" sx={{ width: "160px" }} onClick={() => {
                    addToCart();
                  }}>Add To Cart</Button>

                </Box>
                <Grid container className="generalProductInfo" >
                  <Tooltip title="100% Authentic, directly purchased from Brand" placement="top" arrow>
                    <Grid size={4}>
                      <span className='generalFont'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </span>100% Genuine Products
                    </Grid>
                  </Tooltip>

                  <Tooltip title="Returns/replacements are accepted for unused products only in case of defects, damages during delivery, missing, or wrong products delivered." placement="top" arrow>
                    <Grid size={4}>
                      <span className='generalFont'>
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </span>Easy Return Policy
                    </Grid>
                  </Tooltip>

                  <Grid size={4}>
                    Sold By: SHOP-Retail..
                  </Grid>
                </Grid>

              </Box>

            </Box>

            <Box>
              <div style={{ margin: "20px 2px", fontSize: "20px", color: "white" }}>Product Description</div>
              {!!details && <CustomizedTab details={details} id={details.id} />}
            </Box>

            <Box>
              <div style={{ margin: "20px 2px", fontSize: "20px", color: "white" }}>Ratings and Reviews</div>
              <Box className="reviewBox" >
                {!!details?.reviews ? writeReviews : "No reviews yet..."}
              </Box>
            </Box>

          </Box>
      }
    </>
  )
}
