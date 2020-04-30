import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledTextBtn } from "../../style";

// axios import
import { url as _url } from "../../../url";
import axios from "axios";
import {Typography, Box} from '@material-ui/core';


const ResultPage: FunctionComponent<any> = ({ fullpage_api }: any) => {
  // 성공실패여부 계산
  const _id = window.sessionStorage.getItem("id");
  const [monthlyCost, setMonthlyCost] = useState(0 as number);

  const [monthDay, setMonthDay] = useState(0 as number);
  const [checkResult, setCheckResult] = useState(true as Boolean); // 성공했으면 true

  const [dailyCost, setDailyCost] = useState(0 as number);

  const [money, setMoney] = useState(0 as number);

  var date = new Date();
  var year = date.getFullYear();
  var month = new String(date.getMonth() + 1);
  var day = new String(date.getDate());
  var flag = 0;
  var e_id = 0;

  // 0 처리
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }

  useEffect(() => getMonthlyCost(), []);

  // 유저 한달비용 불러오기 axios
  const getMonthlyCost = () => {
    try {
      const response = axios({
        method: "get",
        url: `${_url}/api/user_detail/${_id}/`,
        responseType: "json",
      }).then((res) => {
        // console.log(res.data);
        setMonthlyCost(res.data.monthly_cost);
        // console.log("한달비용", monthlyCost);
        // 하루 비용 계산하기
        res.data.history.forEach((element) => {
          if (element.payment_date === year + "-" + month + "-" + day) {
            // console.log("hit1");
            e_id = element.id;
            flag = 1;
            // console.log(e_id);
          }
          if (flag === 1) {
            axios({
              method: "get",
              url: `${_url}/api/history_detail/${e_id}/`,
              responseType: "json",
            }).then((res2) => {
              // console.log(res2.data);
              calMonthDay();
              calMoney();
              setDailyCost(
                res2.data.user_breakfast +
                  res2.data.user_lunch +
                  res2.data.user_dinner
              );
              axios({
                method: "put",
                url: `${_url}/api/history_detail/${e_id}/`,
                data: {
                  kakao: _id,
                  total_paid: dailyCost,
                  today_saving: money
                },
                responseType: "json"
              })
              // console.log(dailyCost);
            });
          } else {
            // console.log("hit2");
          }
        });
      });
    } catch (err) {
      alert(err);
    }
  };
  getMonthlyCost();

  // 월수 계산하기
  const day1: Date = new Date();
  const calMonthDay = () => {
    var days = new Date(day1.getFullYear(), day1.getMonth(), 0).getDate();
    setMonthDay(days);
    // console.log(monthDay);
  };

  // result 성공 실패여부 계산
  // const calResult: any = () => {
  //   if (monthlyCost / monthDay >= dailyCost) {
  //     setCheckResult(true);
  //   } else {
  //     setCheckResult(false);
  //   }
  // };

  const calMoney = () => {
    const temp = Number(monthlyCost) / monthDay - Number(dailyCost);
    // console.log(Number(monthlyCost), monthDay, Number(dailyCost));
    // console.log(Number(monthlyCost) / monthDay - Number(dailyCost));
    if (temp <= 0) {
      setMoney(Math.round(Number(dailyCost) - Number(monthlyCost) / monthDay));
    } else {
      setMoney(Math.round(Number(monthlyCost) / monthDay - Number(dailyCost)));
    }
  };

  return (
    <>
      <StyledText>
            <Typography>
              <Box fontSize='2vw'>
                Result Page
              </Box>
            </Typography>
        <Typography component = 'div'>
          <Box fontSize='3vw'>
          {checkResult === monthlyCost / monthDay >= dailyCost
            ? "성공"
            : "실패"}
            </Box>

        </Typography>
        <Typography component = 'div'>
          <Box fontSize='3vw'>
          오늘 하루 식비를
          <br />
          {money}원<br />
          
            {checkResult === monthlyCost / monthDay >= dailyCost
              ? "아끼셨네요"
              : "더 쓰셨다는 사실"}
          
          <br />
      
          {checkResult === monthlyCost / monthDay >= dailyCost
            ? " 먹어서 뭐해요!! 남는건 에어팟인데!"
            : " 먹어서 뭐해요.... 에어팟 안 살꺼에요?"}
          </Box>

        </Typography>

        <StyledTextBtn onClick={() => fullpage_api.moveSlideRight()}>
            <Box fontSize='2vw'>
              다른사람과 비교하러 가기>>
            </Box>
        </StyledTextBtn>
        <br></br>
      </StyledText>
    </>
  );
};

export default ResultPage;
