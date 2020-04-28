import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText, StyledTextBtn } from '../../style';

const ResultSave: FunctionComponent<any> = ({fullpage_api}: any) => {
    const money: Number = 0;
    return (
        <>
        <StyledText>
            <h1>Result Page</h1>

            <h3>오늘 하루 식비를<br />
                {money}원<br />
                더 쓰셨다는 사실<br />
                먹어서 뭐해요....<br />
                에어팟 안 살꺼에요?<br />
            </h3>
            <StyledTextBtn onClick={() => fullpage_api.moveSlideRight()}>다른사람과 비교하러 가기>></StyledTextBtn>
            <br></br>
            </StyledText>
        </>
    )
}

export default ResultSave;