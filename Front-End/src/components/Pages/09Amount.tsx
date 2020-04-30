import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText, StyledTextBtn } from '../style';
import axios from "axios";
import { url as _url } from "../../url";

import { Typography, Box, Container,} from '@material-ui/core';
const Amount: FunctionComponent<any> = ({ }) => {
  const [saveList, setSaveList] = useState([] as any)
  const [itemPrice, setItemPrice] = useState([] as any)
  const _id = window.sessionStorage.getItem('id')

  useEffect(() => onAmount(), [])
  const onAmount = () => {
    axios.get(`${_url}/api/user_detail/${_id}/`)
    // axios.get(`${_url}/api/user_detail/2`)
    .then(response => {
      var temp1 = [] as any
      var temp2: any = response.data.price
      setItemPrice(temp2)
      response.data.history.map((e:any) => {
        temp1.push(e.today_saving)
        setSaveList(temp1)
      })
      }
    )}
    function getArraySum(a){
      var total=0;
      for(var i in a) { 
          total += a[i];
      }
      return total;
  }
  
  return (
    <>
      <StyledText>
        <Container style={{ width:'100%', height:'100%'}}>
        <img src='https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/269056d2-2466-4aff-bd5f-f6c6f908bbe6.jpeg'
        width='30%'
        height='30%'
         />
        <h3>에어팟까지 남은 금액<br />
        {itemPrice-getArraySum(saveList)}원<br />
        </h3>
        <StyledTextBtn>다른 사람은 무엇을 사고 싶어할까요?</StyledTextBtn>
        
        <Typography component = 'div'>
          <Box fontSize='2vw'>
          에어팟까지 남은 금액<br />
          {money}원<br />
          <hr />
                현재 속도로 에어팟까지 걸리는<br />
                시간은 {date}일 입니다<br />
                <StyledTextBtn><Box fontSize='2vw'>다른 사람은 무엇을 사고 싶어할까요?</Box></StyledTextBtn>
          </Box>

        </Typography>
        
        </Container>
      </StyledText>
    </>
  )
}

export default Amount;