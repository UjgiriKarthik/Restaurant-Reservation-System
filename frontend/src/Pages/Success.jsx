// frontend/src/Pages/Success.jsx
import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {HiOutlineArrowNarrowRight} from 'react-icons/hi';

const Success = () => {
  const [countdown,setCountdown] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId=setInterval(()=>{
      setCountdown(preCount=>{
        if(preCount === 1){
          clearInterval(timeoutId);
          navigate("/");
        }
        return preCount - 1;
      })
    },1000);
    return () => clearInterval(timeoutId);
  },[navigate])


  return (
    <>
        <section className='notFound'>
          <div className="container">
            <img src="/sandwich.png" alt="success" />
            <h1>Redirecting to Home in {countdown} seconds....</h1>
            <p>Your reservation has been successfully sent!</p>
            <p>
              Restaurent team will contact you soon!<br/>
              Thanks for your reservation</p>
            <h1>You Will receive a Mail for Conformation</h1>
            <Link to={'/'}>
              Back to Home
              <HiOutlineArrowNarrowRight/>
            </Link>
          </div>
        </section>
    </>
  )
}

export default Success



