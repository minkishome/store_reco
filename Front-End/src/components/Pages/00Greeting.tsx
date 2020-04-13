import React, { FunctionComponent, useState, useEffect, Component } from 'react';
// import ReactDOM from 'react-dom';
import img from './DM.jpg'
import { StyledText } from '../style';


const Greeting: FunctionComponent<any> = ({ }) => {
  return (
    <>
      <StyledText>
        <img src={img} alt="titleImage" max-width='100%' height='auto' />
      </StyledText>
    </>
  )
}



export default Greeting;