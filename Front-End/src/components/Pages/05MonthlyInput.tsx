import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledInput } from "../style";
import axios from "axios";
import { url as _url } from "../../url";

// 프로필 메뉴
// import ProfileMenu from "../UserPage/00ProfileMenu";

const MonthlyInput = () => {
  const [data, setData] = useState(0);
  const onChangeInput = (e: any) => {
    const monthly_data = parseInt(e.target.value);
    setData(monthly_data);
  };
  const _id = window.sessionStorage.getItem("id");
  const semi_nickname = window.sessionStorage.getItem("nickname");
  const _password = window.sessionStorage.getItem("password");
  const onSubmit = async () => {
    try {
      console.log("여기확인");
      console.log(_id);
      const _nickname = semi_nickname
        ? semi_nickname.replace(/^"+|"+$/g, "")
        : semi_nickname;
      console.log(data);
      const res = await axios({
        method: "put",
        url: `${_url}/api/user_detail/${_id}/`,
        data: {
          password: _password,
          kakao_id: _id,
          nickname: _nickname,
          monthly_cost: data,
        },
        responseType: "json",
      });
    } catch (err) {
      alert(err); // WTF?
    }
  };
  const Enter_Check = (e) => {
    if (e.keyCode == 13) {
      onSubmit(); // 실행할 이벤트
    }
  };
  return (
    <>
      <StyledText>
        <h3>
          나는 한달 평균 식비를 <br />
          <StyledInput
            onChange={onChangeInput}
            onKeyDown={Enter_Check}
          ></StyledInput>
          원 써요
        </h3>
        <button onClick={onSubmit}>추가</button>
      </StyledText>
    </>
  );
};

export default MonthlyInput;
