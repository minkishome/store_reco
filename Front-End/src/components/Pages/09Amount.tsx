import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText, StyledTextBtn } from '../style';
import axios from "axios";
import { url as _url } from "../../url";

const Amount: FunctionComponent<any> = ({ }) => {
  const [saveList, setSaveList] = useState([] as any)
  const [itemPrice, setItemPrice] = useState([] as any)
  const [itemName, setItemName] = useState('')
  const [itemImage, setItemImage] = useState('')
  const _id = window.sessionStorage.getItem('id')

  useEffect(() => onAmount(), [])
  const onAmount = () => {
    axios.get(`${_url}/api/user_detail/${_id}/`)
    // axios.get(`${_url}/api/user_detail/2`)
    .then(response => {
      var temp1 = [] as any
      var temp2: any = response.data.price
      var temp3 = response.data.item
      var temp4 = response.data.itme_image
      setItemPrice(temp2)
      setItemName(temp3)
      setItemImage(temp4)
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
        <img src={itemImage}
        width='200px'
        height='200px'
         />
        <h3>
        {itemPrice-getArraySum(saveList) > 0 ? 
        `${itemName} 사기까지 ${itemPrice-getArraySum(saveList)}원 남았습니다.` : 
        `축하합니다!`}
        </h3>
        <StyledTextBtn>다른 사람은 무엇을 사고 싶어할까요?</StyledTextBtn>
      </StyledText>
    </>
  )
}

export default Amount;