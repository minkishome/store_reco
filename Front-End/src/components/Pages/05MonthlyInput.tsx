import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledInput } from "../style";
import axios from "axios";
import { url as _url } from '../../url';

// 프로필 메뉴
// import ProfileMenu from "../UserPage/00ProfileMenu";

const MonthlyInput = ({}) => {
  type ReqData = {
    contents: string,
    attendants: string,
    place: string,
    title: string,
    startAt: Date,
    endAt: Date,
    id: any,
};
  const [data, setData] = useState({} as ReqData);
  const onChangeInput = (e: any) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({
      ...data,
      [id]: value,
    });
  }
  console.log(window.sessionStorage.getItem('id'))
  // console.log(window.sessionStorage.getItem('id'))
  const onSubmit = async () => {
    try {
      // console.log(data)
      // 보내는 Data 를 펼쳤을때 이런 것들이 있다고 정의

      const reqData: ReqData = {
        ...data,
        id: window.sessionStorage.getItem('id'),
        // contents: text.replace(/(\n|\r\n)/g, '<br>')
      }
      // Validation error cut
      // if (!reqData.title || !reqData.startAt || !reqData.endAt) {
      //   alert("wft");
      //   return;
      // }

      const res = await axios.post(`${_url}/api/history_list`, reqData);

      // if (![200, 201, 301].includes(res.status)) {
      //   alert('wtf server');
      //   return;
      // }
      // ;

      // close();

    } catch (err) {
      alert(err); // WTF?
    }
  }
  return (
    <>
      {/* <ProfileMenu /> */}
      <StyledText>
        <h3>
          나는 한달 평균 식비를 <br />
          <StyledInput onChange={onChangeInput}></StyledInput>원 써요
        </h3>
        <button onClick={onSubmit}>추가</button>
      </StyledText>
    </>
  );
};

export default MonthlyInput;
