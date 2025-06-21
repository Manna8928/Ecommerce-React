import { Grid } from '@mui/material';
import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewCard = ({ review }) => {
  const reviewDate = useMemo(() => {
    return new Date(review.date).toLocaleDateString()

  }, [review.date])
  return (
    <Grid container spacing={2} className="reviewGrid">
      <Grid
        container
        size={4}
        direction={'row'}
      >
        <div className='avatar'>{review.reviewerName.substring(0, 1)}</div>
        <div>{review.reviewerName}</div>
      </Grid>
      <Grid
        container
        direction={'column'}
        size={8}
      >
        <Grid
          container
          sx={{ justifyContent: 'space-between' }}
        >
          <div className='reviewRating'>{review.rating}
            <FontAwesomeIcon icon={faStar} className='star' />
          </div>
          <div style={{color:"#696969",fontSize:"12px"}}>{reviewDate}</div>

        </Grid>
        <div>{review.comment}</div>
      </Grid>
    </Grid>
  )
}

export default ReviewCard