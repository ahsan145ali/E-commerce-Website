import React , {useState , useEffect} from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { commerce } from '../lib/Commerce_prod';
import './Checkout.css';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
const steps = ['Shipping Address' , 'Payment details']


const Checkout = ({cart , order, onCaptureCheckout,error}) => {
    const [activeStep , setActiveStep] = useState(0);
    const [checkoutToken , setCheckoutToken] =useState(null);   
    const [shippingData , setShippingData] =useState({});      
    useEffect(()=>{
      const generateToken = async() =>{
        try{
            const token = await commerce.checkout.generateToken(cart.id,{type:'cart'});
            setCheckoutToken(token);
        } catch(error){

        }
      }

      generateToken();
    },[cart]);

    const nextStep = () => setActiveStep((previosActiveStep) => previosActiveStep + 1);
    const backStep = () => setActiveStep((previosActiveStep) => previosActiveStep - 1);

    const next = (data) =>{
        setShippingData(data);
        nextStep();
    
    }

    const Confirmation = () => (
        <>
            <div>
              <Typography variant='h5'>Thank You For Your Purchase</Typography>
            </div>
        </>
    )
    const Form = () => activeStep === 0 ? 
      <AddressForm checkoutToken = {checkoutToken} next = {next}/>
     : <PaymentForm checkoutToken = {checkoutToken} backStep = {backStep} shippingData={shippingData} onCaptureCheckout ={onCaptureCheckout} nextStep={nextStep}/>
  return (
    <>
      <div className="toolbar" />
      <main className="layout">
        <Paper className="paper">
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className="stepper">
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
        </Paper>
      </main>
    </>
  )
}

export default Checkout;
