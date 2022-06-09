import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import './CartItem.css'

const CartItem = ({ item ,handleRemoveFromCart,handleUpdateCartQTY}) => {

  return (
    <Card >

      <CardMedia image={item.image.url} alt={item.name} className="media" />

      <CardContent className="cardContent">
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>

      <CardActions className="cardActions">
        <div className="buttons">
          <Button type="button" size="small" onClick={()=> handleUpdateCartQTY(item.id,item.quantity - 1)} >-</Button>
          <Typography>{item.quantity}</Typography>
          <Button type="button" size="small"  onClick={()=> handleUpdateCartQTY(item.id,item.quantity + 1)}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={()=>handleRemoveFromCart(item.id)}>Remove</Button>
      </CardActions>

    </Card>
  );
};

export default CartItem;