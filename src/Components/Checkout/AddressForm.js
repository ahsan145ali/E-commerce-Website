import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import {commerce} from '../lib/Commerce_prod';

import './AddressForm.css';

const AddressForm = ({checkoutToken , next}) => {

  const methods = useForm();
  
 /* States Used To Managed Shipping Options */
  const [shippingCountries, setShippingCountries] = useState([]);  
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const countries = Object.entries(shippingCountries).map(([code,name]) =>({id: code , label:name}))
  const subdivisions = Object.entries(shippingSubdivisions).map(([code,name]) =>({id: code , label:name}))
  const options = shippingOptions.map((op)=>({id: op.id , label:`${op.description} - (${op.price.formatted_with_symbol})`}))

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region }); 

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);



  return (
    <>
       <Typography variant='h6' gutterBottom>Shipping Address</Typography>
       <FormProvider {...methods} >
          <form onSubmit={methods.handleSubmit((data)=> next({...data , shippingCountry , shippingSubdivision , shippingOption}) )} >
            <Grid container spacing = {3} >
            <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address1" label="Address line 1" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="Zip / Postal code" />

            <Grid item xs={12} sm={6}>   {/* Slect For Shipping Country */}
                    <InputLabel>Shipping Country</InputLabel>
                    <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}> 
                         {countries.map((country)=>(
                             <MenuItem key = {country.id} value={country.id}>
                               {country.label}
                           </MenuItem>
                         ))}
                        
                    </Select>
              </Grid>

              <Grid item xs={12} sm={6}>   {/* Slect For Shipping Sub Division */}
                    <InputLabel>Shipping SubDivision</InputLabel>
                    <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}> 
                         {subdivisions.map((sub)=>(
                             <MenuItem key = {sub.id} value={sub.id}> {sub.label}  </MenuItem>
                         ))}
                        
                    </Select>
              </Grid>
              
              <Grid item xs={12} sm={6}> {/* Slect For Shipping Options */}
                    <InputLabel>Shipping Options</InputLabel>
                    <Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}> 
                      {options.map((opt)=>(
                             <MenuItem key = {opt.id} value={opt.id}> {opt.label}  </MenuItem>
                         ))}
                    </Select>
              </Grid>



            </Grid>
            <br/>
            <div style={{display:'flex' , justifyContent: 'space-between'}}>
                  <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                  <Button type="submit" variant='contained' color='primary'>Next</Button>         
            </div>
          </form>
       </FormProvider>
    </>
  )
}

export default AddressForm;
