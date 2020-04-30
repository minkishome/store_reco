import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText } from '../style';
import axios from 'axios';
import { url as _url } from '../../url';
import Imgur from "./Imgur";

const Information: FunctionComponent<any> = ({ setUserImage }: any) => {
  const [userInfo, setUserInfo] = useState([] as any);
  const [isEdit, setIsEdit] = useState(false as boolean);

  useEffect(() => getUserInfo(), [])

  const getUserInfo = () => {
    const _id = window.sessionStorage.getItem('id');
    axios.get(`${_url}/api/user_detail/${_id}/`)
      .then(response => {
        setUserInfo(response.data)
        // setUserImage(response.data.profile_image)
      });
  };

  const isEditHandler = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      {isEdit
        ?
        <StyledText>
          <h1>회원정보 수정</h1>
          <button onClick={() => isEditHandler()}>수정완료</button>
          <hr />
          <h3>E-mail</h3>
          {userInfo.email}
          <h3>닉네임</h3>
          {userInfo.nickname}
          {/* <h1>목표상품</h1> */}``
          <hr />
          <h3>한달 식비</h3>
          <input></input>
          <h3>목표 상품</h3>
          <input placeholder="에어팟 프로"></input>
          <Imgur />
          <h3>가격</h3>
          <input placeholder="300,000"></input>
          <br></br>
        </StyledText>
        :
        <StyledText>
          <h1>회원정보 조회</h1>
          <button onClick={() => isEditHandler()}>수정하기</button>
          <hr />
          <h3>E-mail</h3>
          {userInfo.email}
          <h3>닉네임</h3>
          {userInfo.nickname}
          {/* <h1>목표상품</h1> */}
          <hr />
          <h3>한달 식비</h3>
          {userInfo.monthly_cost}
          <h3>목표 상품</h3>
          <input placeholder="에어팟 프로"></input>
          <Imgur />
          <h3>가격</h3>
          <input placeholder="300,000"></input>
          <br></br>
        </StyledText>
      }
    </>
  );
};

export default Information;
