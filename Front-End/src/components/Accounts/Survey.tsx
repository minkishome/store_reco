import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from "../style";
import axios from "axios";
import { url as _url } from "../../url";

const Survey: FunctionComponent<any> = ({}) => {
  const [selectedFood, setSelectedFood] = useState([] as any);
  const [toggleSelected, setToggleSelected] = useState(false);

  // toggledSelected 값에 따라 setSelectedFood 가 selectedFood 로 바뀜
  useEffect(() => setSelectedFood(selectedFood), [toggleSelected]);
  // console.log('이거', selectedFood)

  const svFood = [
    [
      "돈가스",
      "https://cdndept.galleria.co.kr/upload/dept/gourmet/au/to/00000000/gourmet-store/hb82139127pr.jpg",
      false,
    ],
    [
      "떡볶이",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20190121035638_photo1_b5c2cf61ba61.jpg",
      false,
    ],
    [
      "회",
      "https://lh3.googleusercontent.com/proxy/eo38mWCFOAwEusXTTc1WsWHk0YaQ7iB4fqFwRXbgQvy6tvLceULSOy3L44IcfrbIjmNvloHUWAleXiPXFJitIm-rnhwm9qr-pf13COTR0H0",
      false,
    ],
    [
      "파스타",
      "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/67344753_102419641078121_3977315267022583304_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=85rSuHundR8AX_PmgFW&oh=9fcabe89efb8e58e76f858d81be31a85&oe=5EAD9328",
      false,
    ],
    ["곱창", "https://t1.daumcdn.net/cfile/tistory/234F5D3D586B0E6229", false],
    [
      "김치찌개",
      "https://lh3.googleusercontent.com/proxy/jXTvm2f8-en6u4txPaX9BHV83MkttK-DUKfpFdkdlX5akcvTQEe8z_b_K-OkXy_-UBq_23IhjZQtl4FyI4opzyzAOPKT-DB4eo7nhIJ1RGPLtxKA9BXLWYZW_S3_FGtOPzWmEhiOxreCqbXwrzrF07GqabH0kuBcMldAN_mn0tLJOijzdqcgO0vQebtAJnwBip0_Rt9YrXzgXytSRNHrkGqjl7d1HB_1ZBWXuo4yh3tqc_ZO8nSXzbHDAJgOkmldz2Jf0OasOCy9UBib5fH5MnYmje6LuGitOw",
      false,
    ],
    [
      "피자",
      "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F997E8F3359A4FF1E1C",
      false,
    ],
    [
      "치킨",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTz_QsUu9Hkks-QQ2L2hzWWlbrJsYNnBgdjS6Bph7wJHsgO5RmQ&usqp=CAU",
      false,
    ],
    [
      "삼겹살",
      "https://lh3.googleusercontent.com/proxy/kjMQoRyX9feqcOKbFWylQ6YWMVCJfXXzhryY_EGMxYd3O87Hg8ATRieT0koaJZRvwlU8DD-LhC5onWkidqKXdoU6wjps3tx2dJ3JdI601nZLzQEtn_wjUDCZTdACz4Tv9JqEQZ2SmCauxwmQ3R0loKsGy7vF3rLoADnsB4AktMWQFBfOHZVtvBbIupC-IAIysHp5J-GNbkQfqIDnuRnIw06SseJ-Ould4Kk5Hfwb6kg1Qg",
      false,
    ],
    [
      "중식",
      "https://mp-seoul-image-production-s3.mangoplate.com/247675/1082689_1531640891581_238782?fit=around|512:512&crop=512:512;*,*&output-format=jpg&output-quality=80",
      false,
    ],
    ["초밥", "https://t1.daumcdn.net/cfile/tistory/2718253A58B06DF005", false],
    [
      "카페",
      "https://images.happycow.net/venues/1024/11/13/hcmp111384_618651.jpeg",
      false,
    ],
    [
      "스테이크",
      "https://lh3.googleusercontent.com/proxy/WVYOD77Go7ECJkX7htF9bJYPO1wOy1Ug-JS8j6y5SC1jARExtktMtSSJHUPSYdc52B0B0OYXU7fmi11Wd9U48iFpsaLfRZKcwrdth6qrHe1QOXy2Brn6I7Ixdj9CyzsLWhnffIKOKlGIcKe3TNitladc_QWx68gVm9KlsP2w0v_3PoWDl7X3s2tJJBJU4xvNoxBmEVj9msz7Db-5LhAXY_NyEcltWV_oEWSHm7Ubs18YS-V_jm4O8zVZS4GxwWHpldN0JVEmh7qTdZsf2SN4rhJ3stAZeUFfiR1CeAdplIG6Dq308zL9qDQe6HB6RCuonsf6J570vSqGUnCDSlFrD8vOFZZuI7_mvB3nkR6cQNtQ7WK8BJnkuNbpCD67DLq79ypKWbquzyfOq93ISX2cfg",
      false,
    ],
    [
      "순대국",
      "https://live.staticflickr.com/1579/24789961300_af7d884bf6_b.jpg",
      false,
    ],
    [
      "칼국수",
      "https://t1.daumcdn.net/cfile/tistory/014AE13A508FED0012",
      false,
    ],
    [
      "쌀국수",
      "https://rudol.net/attachmentR2/20170726/20170726RiceNoodles@Emoi.jpg.jpg",
      false,
    ],
    [
      "햄버거",
      "https://img.etoday.co.kr/pto_db/2020/01/20200117103646_1414301_545_469.PNG",
      false,
    ],
    [
      "족발",
      "https://d3af5evjz6cdzs.cloudfront.net/images/uploads/800x0/kakaotalk_20180817_151912354_458272c236a0645aaf0f7ae08f3df68f.jpg",
      false,
    ],
  ];

  const svList = svFood.map((e: any, idx: number) => {
    const onClickHandler = (e: any) => {
      if (selectedFood.find((element) => element === e[0])) {
        const sFood = selectedFood.filter((item) => item !== e[0]);
        setSelectedFood(sFood);
        setToggleSelected(!toggleSelected);
        alert(`${e[0]}를 선택해제했습니다`);
      } else {
        const sFood = selectedFood.filter((item) => item);
        sFood.push(e[0]);
        setSelectedFood(sFood);
        setToggleSelected(!toggleSelected);
        alert(`${e[0]}를 선택했습니다`);
      }
    };
    return (
      <>
        <img
          src={e[1]}
          width="150px"
          height="150px"
          onClick={() => onClickHandler(e)}
        ></img>
      </>
    );
  });

  const submitHandler = async () => {
    alert("요청간당");
    const _id = window.sessionStorage.getItem("id");
    try {
      const response = await axios({
        method: "post",
        url: `${_url}/stores/score_list/${_id}/`,
        data: {
          foodList: selectedFood,
        },
        responseType: "json",
      });
      console.log(response);
    } catch (err) {
      alert(err);
    }
    alert(`${selectedFood}`);
  };

  return (
    <>
      <StyledText>
        <h1>Survey</h1>
        <h2>좋아하는 음식을 선택해주세요.</h2>
        {svList}
        <br></br>
        <p>선택된 음식: {selectedFood}</p>
        <StyledBtn onClick={() => submitHandler()}>설문완료</StyledBtn>
      </StyledText>
    </>
  );
};

export default Survey;
