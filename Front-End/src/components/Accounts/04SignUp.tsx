import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText } from '../style';

const SignUp: FunctionComponent<any> = ({ }) => {
    return (
        <>
        <StyledText>
            <h1>회원가입</h1>
            <h4>저희와 함께 식비를 분석해보아요 :)</h4>
            <button>카카오 로그인</button>
            <br></br>
            <button>구글 로그인</button>
        </StyledText>
        </>
    )
}

export default SignUp;