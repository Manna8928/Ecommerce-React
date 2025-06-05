import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function Product(props){
    // console.log("in product page ",props.category, props.description,props.image,props.price,props.rating.count,props.rating.rate,props.title)
  return (
    <Card className='card'>
      <CardActionArea>
        <CardMedia
         
          
          image={props.image}
          alt={props.category}
          className='cardImg'
        />
        <CardContent sx={{textAlign:'center'}}>
          <Typography  variant="body2">
            {props.title}
          </Typography>
          <Typography  variant="body2" >
            {props.rating.rate}
          </Typography>
          <Typography  variant="body2">
            $ {props.price}
          </Typography>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}







