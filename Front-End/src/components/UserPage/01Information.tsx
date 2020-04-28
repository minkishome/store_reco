import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText } from '../style';
import axios from 'axios';
import { url as _url } from '../../url';

const Information: FunctionComponent<any> = () => {
  const [userInfo, setUserInfo] = useState([] as any);

  // useEffect(
  //   async () => {
  //   try {
  //     const _id = window.sessionStorage.getItem('id');
  //     const res = await axios.get(`${_url}/api/user_detail/${_id}/`);
  //     setUserInfo(res.data)
  //   } catch (err) {
  //     alert(err);
  //   }
  // }, 
  // [_url])

  // const getUserInfo = () => {
  //   const _id = window.sessionStorage.getItem('id');
  //   axios.get(`${_url}/api/user_detail/${_id}/`)
  //   .then(response => {
  //     setUserInfo(response.data)
  //     console.log(userInfo)
  //   });
  // };

  // getUserInfo();


  return (
    <>
    <StyledText>
      <h1>회원정보</h1>
      <h2>프로필</h2>
      <hr />
      <h3>E-mail</h3>
      <h3>ssafy@naver.com</h3>
      <h3>이름</h3>
      <h3>닉네임</h3>
      <h3>한달 식비</h3>

      <h2>목표상품</h2>
      <hr />
      <input placeholder="에어팟 프로"></input>
      <h3>가격</h3>
      <input placeholder="300,000"></input>
      </StyledText>
    </>
  );
};

export default Information;
