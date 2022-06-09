import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import './CartScreen.css'
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';
const CartScreen = ({ cart , handleUpdateCartQTY , handleRemoveFromCart , handleEmptyCart}) => {

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">You have no items in your shopping cart,
      <Link to='/' className='link'> Start Adding Some!</Link>
    </Typography>
  );

  if (!cart.line_items) return 'Loading...';

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item = {item} 
              handleUpdateCartQTY = {handleUpdateCartQTY}
              handleRemoveFromCart = {handleRemoveFromCart}/>
          </Grid>
        ))}
      </Grid>
      <div className="cardDetails">
        <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button className="emptyButton" size="large" type="button" variant="contained" color="secondary"
           onClick={handleEmptyCart}>Empty cart</Button>
          <Button component = {Link} to="/checkout" className="checkoutButton" size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className="toolbar" />
      <Typography className="title" variant="h3" gutterBottom>Your Shopping Cart</Typography>
      { !cart.line_items.length ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default CartScreen;