import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledTextBtn } from "../../style";

import ResultSave from "./07ResultSave";
import ResultFail from "./08ResultFail";

// axios import
import { url as _url } from "../../url";
import axios from "axios";

const ResultPage: FunctionComponent<any> = ({}) => {

  // 성공실패여부 계산
  const _id = window.sessionStorage.getItem("id");
  const [monthlyCost, setMonthlyCost] = useState(0 as number);
  const [dailyCost, setDailyCost] = useState(0 as number);

  // 유저 한달비용 불러오기 axios
  const getMonthlyCost = () => {
    console.log("고고");
    try {
      const response = axios({
        method: "get",
        url: `${_url}/api/user_detail/${_id}/`,
        responseType: "json",
      }).then((res) => {
        setMonthlyCost(res.data.monthly_cost);
        console.log(monthlyCost);
      });
      // alert("연결성공");
    } catch (err) {
      alert(err);
    }
  };

  // 유저 히스토리에서 하루비용 불러오기 axios


  const getDailyCost = () => {
    console.log("하루비용 고고 ");
    try {
      const response = axios({
        method: "get",
        url: `${_url}/api/history_list/`,
        responseType: "json",
      }).then((res) => {
        setDailyCost(res.data); // 히스토리 data 어떻게 가져오는지 확인하기
        console.log(dailyCost);
      });
    } catch (err) {
      alert(err);
    }
  };

  // 월수 계산하기
  const day: Date = new Date();
  // const year: Number = date.getFullYear();
  // const month: Number = date.getMonth();

  // const monthDay: Number = new Date(year, month, 0).getDate();
  const monthDay: number = new Date(
    day.getFullYear(),
    day.getMonth(),
    0
  ).getDate();

  const [checkResult, setCheckResult] = useState(true as Boolean); // 성공했으면 true

  const calResult: any = () => {
    if (monthlyCost / monthDay >= dailyCost) {
      setCheckResult(true);
    } else {
      setCheckResult(false);
    }
  };

  // 월수 계산하기
  // const money: Number = 0;

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const monthDay = new Date(year, month, 0).getDate();

  var checkPoint = true; // 성공했으면 true

  const calResult = () => {
    if (monthCost / monthDay >= dayCost) {
      checkPoint = true;
    } else {
      checkPoint = false;
    }
  };

  if (checkPoint === true) {
    return (
      <>
        <StyledText>
          <h1>Result Page</h1>
          <ResultSave />
          <StyledTextBtn>다른사람과 비교하러 가기>></StyledTextBtn>
          <br></br>
        </StyledText>
      </>
    );
  } else {
    return (
      <>
        <StyledText>
          <h1>Result Page</h1>
          <ResultFail />
          <StyledTextBtn>다른사람과 비교하러 가기>></StyledTextBtn>
          <br></br>
        </StyledText>
      </>
    );
  }
};

export default ResultPage;
