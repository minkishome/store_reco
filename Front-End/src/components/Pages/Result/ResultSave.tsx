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

const ResultSave: FunctionComponent<any> = ({}) => {
  // const money: Number = 0;

  const [money, setMoney] = useState(0 as number);

  const _id = window.sessionStorage.getItem("id");
  const [monthlyCost, setMonthlyCost] = useState(0 as number);

  const [monthDay, setMothDay] = useState(0 as number);
  const [checkResult, setCheckResult] = useState(true as Boolean); // 성공했으면 true

  const [dailyCost, setDailyCost] = useState(0 as number);

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

  useEffect(() => setCheckResult(!checkResult), []);

  // 유저 한달비용 불러오기 axios
  const getMonthlyCost = () => {
    console.log("고고");
    try {
      const response = axios({
        method: "get",
        url: `${_url}/api/user_detail/${_id}/`,
        responseType: "json",
      }).then((res) => {
        console.log(res.data);
        setMonthlyCost(res.data.monthly_cost);
        console.log("한달비용", monthlyCost);
        // 하루 비용 계산하기
        res.data.history.forEach((element) => {
          if (element.payment_date === year + "-" + month + "-" + day) {
            console.log("hit1");
            e_id = element.id;
            flag = 1;
            console.log(e_id);
          }
          if (flag === 1) {
            axios({
              method: "get",
              url: `${_url}/api/history_detail/${e_id}/`,
              responseType: "json",
            }).then((res2) => {
              console.log(res2.data);
              setDailyCost(
                res2.data.user_breakfast +
                  res2.data.user_lunch +
                  res2.data.user_dinner
              );
              console.log(dailyCost);
            });
          } else {
            console.log("hit2");
          }
        });
      });
    } catch (err) {
      alert(err);
    }
  };

  // 월수 계산하기
  const day1: Date = new Date();
  const calMonthDay = () => {
    var days = new Date(day1.getFullYear(), day1.getMonth(), 0).getDate();
    setMothDay(days);
  };

  // 돈 계산
  const calMoney = () => {
    var limitCost = monthlyCost / monthDay;
    setMoney(dailyCost - limitCost);
    console.log(money);
  };

  return (
    <>
      <StyledText>
        <h1>성공</h1>
        <h3>
          오늘 하루 식비를
          <br />
          {money}원<br />
          아끼셨네요
          <br />
          먹어서 뭐해요!!
          <br />
          남는건 에어팟인데!
          <br />
        </h3>
      </StyledText>
    </>
  );
};

export default ResultSave;
