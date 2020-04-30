import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from "../style";
import axios from 'axios';
import { url as _url } from '../../url';
import Container from '@material-ui/core/Container';
import { Typography, Grid  } from "@material-ui/core";



const Survey: FunctionComponent<any> = ({fullpage_api}) => {
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
      "https://imagescdn.gettyimagesbank.com/500/201708/jv10941683.jpg",
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
"data:image/jpeg;base64,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",      false,
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKO8j7JNOee6d3YcAVz18vMZBYIhysBFR4P0EGjnoVnU9YA1d6&usqp=CAU",
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
      "data:image/jpeg;base64,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",
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

            <img src={e[1]} width="17%" height="auto%" onClick={() => onClickHandler(e)}></img>

      </>
    )
  });

  const submitHandler = async () => {
    (selectedFood.length === 0)
    ? alert('최소 1개 이상의 음식을 선택해 주세요')
    : alert(`${selectedFood} 를 선택했습니다`)
    const _id = window.sessionStorage.getItem('id')
    try {
      const response = await axios({
        method: "post",
        url: `${_url}/stores/score_list/${_id}/`,
        data: {
          user_id: _id,
          foodList: selectedFood,
        },
        responseType: "json"
      })
      fullpage_api.moveSlideRight()
    }
    catch (err) {
      alert(err);
    }
  };

  return (
    <>
    <Container style= {{ 
      height:'100%'
    }}>
      {/* <StyledText> */}
      {/* <Container style={{height:'25%'}}> */}
        <Typography style={{fontSize:'3vw'}}>Survey</Typography>
        <Typography style={{fontSize:'2vw'}}>좋아하는 음식을 선택해주세요.</Typography>
      {/* </Container> */}
        <Container  style={{height: '50%', width:'100%', }}>
          {svList}
        
        <br></br>
        <p>선택된 음식: {selectedFood}</p>
        <StyledBtn onClick={submitHandler}>설문완료</StyledBtn>
        </Container>
      {/* </StyledText> */}
      </Container>
    </>
  );
};

export default Survey;
