import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from '../style';
import axios from "axios";
import { url as _url } from "../../url";



const History: FunctionComponent<any> = ({}) => {
  const [dateList, setDateList] = useState([] as any)
  const [brakefastList, setBrakefastList] = useState([] as any)
  const [lunchList, setLunchList] = useState([] as any)
  const [dinnerList, setDinnerList] = useState([] as any)
  const [saveList, setSaveList] = useState([] as any)
  const _id = window.sessionStorage.getItem('id')
  useEffect(() => onAmount(), [])

  const onAmount = () => {
    axios.get(`${_url}/api/user_detail/${_id}`)
    .then(response => {
      var temp1 = [] as any
      var temp2 = [] as any
      var temp3 = [] as any
      var temp4 = [] as any
      var temp5 = [] as any
      response.data.history.map((e:any) => {
        temp1.push(e.payment_date)
        temp2.push(e.user_breakfast)
        temp3.push(e.user_lunch)
        temp4.push(e.user_dinner)
        temp5.push(e.today_saving)
        setDateList(temp1)
        setBrakefastList(temp2)
        setLunchList(temp3)
        setDinnerList(temp4)
        setSaveList(temp5)
      })
      }
    )}
  return (
    <>
    <StyledText>




      
      <h1>MY HISTORY</h1>
      <div>
        <h2>날짜</h2>
        <h2>사용금액</h2>

        <h2>저축금액</h2>

        <h2>달성률</h2>
      </div>
      <hr />
      <h2>20 / 03 / 30</h2>
      <h2>10,000</h2>

      <h2>+ 500</h2>

      <h2>10 %</h2>
      <hr />
      <h2>합계</h2>
      <h2>10,000</h2>

      <h2>- 500</h2>

      <h2>10 %</h2>
      <hr />

      <StyledBtn>돌아가기</StyledBtn>
      </StyledText>
    </>
  );
};

export default History;
