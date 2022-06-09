import React from "react";
import { Card, CardMedia , CardContent, CardActions , Typography , IconButton } from "@material-ui/core";
import './Product.css'
import { AddShoppingCart } from "@material-ui/icons";
import   "./Product.css";

const Product = ({product , onAddToCart}) =>{
    return(
        <Card className="root">
            <CardMedia className="media" image={product.image.url} title={product.name} />
            <CardContent>
                <div className="cardContent">
                        <Typography variant="h5" gutterBottom > 
                            {product.name}
                        </Typography>
                        <Typography variant="h5" gutterBottom > 
                            {product.price.formatted_with_symbol}
                        </Typography>
                       
                 </div>   
                 <Typography variant="body2" color="textSecondary" 
                  dangerouslySetInnerHTML = {{ __html: product.description}}/>  
            </CardContent>
            <CardActions disableSpacing className="cardActions">
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id , 1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Product;