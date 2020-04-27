import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText, StyledInput } from '../style';
import axios from "axios";
import { url as _url } from '../../url';

const DailyInput: FunctionComponent<any> = ({ }) => {
  const total: Number = 0;
  const [breakfast, setBreakfast] = useState(0);
  const changeBreakfast = (e: any) => {
    // const breakfast_id = e.target.id;
    const breakfast_value = e.target.value;
    setBreakfast(breakfast_value)
  }

  const [lunch, setLunch] = useState(0);
  const changeLunch = (e: any) => {
    // const lunch_id = e.target.id;
    const lunch_value = e.target.value;
    setLunch(lunch_value);
  }


  const [dinner, setDinner] = useState(0);
  const changeDinner = (e: any) => {
    // const dinner_id = e.target.id;
    const dinner_value = e.target.value;
    setDinner(dinner_value);
  }

  const onSubmit = async () => {
    try {
      // console.log(data)
      // 보내는 Data 를 펼쳤을때 이런 것들이 있다고 정의
      // Validation error cut
      // if (!reqData.title || !reqData.startAt || !reqData.endAt) {
      //   alert("wft");
      //   return;
      // }
      const _id = window.sessionStorage.getItem('id')
      // const _nickname = window.sessionStorage.getItem('nickname')
      // const _password = window.sessionStorage.getItem('password')

      const res = await axios({
        method: "post",
        url: `${_url}/api/history_list/`,
        data: {
          user: 2,
          user_breakfast: breakfast,
          user_lunch: lunch,
          user_dinner: dinner,
        },
        responseType: "json"
      });

    } catch (err) {
      alert(err); // WTF?
    }
  }
  // const selectNum = () => {
  //   var numSelect = document.getElementById("price");
  //   if (numSelect) {
  //     console.log(numSelect)
  //     // var text = numSelect.options[document.getElementById("price").selectedIndex].text;

  //     // // // option value 가져오기
  //     // document.getElementById('price').value = this.options[this.selectedIndex].value
      
  //     // var value = numSelect.options[document.getElementById("price").selectedIndex].value
  //   }
  //   // text 가져오기
    
    
  //   }
  return (
    <>
      <StyledText>
        <h3>나는 오늘 아침에 <StyledInput onChange={changeBreakfast} />
        점심에 <StyledInput onChange={changeLunch} />
        저녁에 <StyledInput onChange={changeDinner} />
          원 썼어요</h3>
          <button onClick={onSubmit}>추가</button>
        <h2>총 합: {total}</h2>
      </StyledText>
    </>
  )
}

export default DailyInput;