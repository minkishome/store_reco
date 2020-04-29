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

const ResultFail: FunctionComponent<any> = ({}) => {
  // const money: Number = 0;

  const [money, setMoney] = useState(0 as number);

  const monthlyConst = window.sessionStorage.getItem("monthly");
  const dailyCost = window.sessionStorage.getItem("daily");
  const [monthDay, setMothDay] = useState(0 as number);

  // 월수 계산하기
  const day1: Date = new Date();
  const calMonthDay = () => {
    var days = new Date(day1.getFullYear(), day1.getMonth(), 0).getDate();
    setMothDay(days);
  };

  const calMoney = () => {
    const limitCost = Number(monthlyConst) / monthDay;
    setMoney(limitCost - Number(dailyCost));
    console.log(money);
  };

  return (
    <>
      <StyledText>
        <h1>실패</h1>
        <h3>
          오늘 하루 식비를
          <br />
          {money}원<br />
          더 쓰셨다는 사실
          <br />
          먹어서 뭐해요....
          <br />
          에어팟 안 살꺼에요?
          <br />
        </h3>
        <br></br>
      </StyledText>
    </>
  );
};

export default ResultFail;
