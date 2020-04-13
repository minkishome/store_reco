import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText } from '../style';

const Login: FunctionComponent<any> = ({ }) => {
  return (
    <>
      <StyledText>
        <h1>로그인</h1>
        <h4>로그인 후 더 많은 혜택을 누리세요!</h4>
        <button>카카오 로그인</button>
        <br></br>
        <button>구글 로그인</button>
      </StyledText>
    </>
  )
}

export default Login;