import React, {
  FunctionComponent,
  useState,
  useEffect,
  Component,
} from "react";
import { StyledText, StyledBtn } from "../style";

// axios import
import { url as _url } from "../../url";
import axios from "axios";

// materia-ui 모달 import
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const checkDayli = 0;
const _id = window.sessionStorage.getItem("id");
// const [storeList, setStoreList] = useState([]);

const Recommand: FunctionComponent<any> = ({}) => {
  // 알고리즘 음식점 axios
  const getRecommandStore = () => {
    try {
      const response = axios({
        method: "get",
        url: `${_url}/stores/store_list/3/`, // 알고리즘 url
        responseType: "json",
      }).then((res) => {
        console.log(res.data);
      });
      alert("연결성공");
    } catch (err) {
      alert(err);
    }
  };

  ////////////////////////////////////////////////////////
  // 성공실패여부 계산하는 부분

  const _id = window.sessionStorage.getItem("id");
  const [monthlyCost, setMonthlyCost] = useState(0 as number); // 왜 얘만 Number 하면 안되는걸까?

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
        console.log(monthDay);
      });
      // alert("연결성공");
    } catch (err) {
      alert(err);
    }
  };

  // 유저 히스토리에서 하루비용 불러오기 axios
  const [dailyCost, setDailyCost] = useState(0 as Number);

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
  const date: Date = new Date();
  // const year: Number = date.getFullYear();
  // const month: Number = date.getMonth();

  // const monthDay: Number = new Date(year, month, 0).getDate();
  const monthDay: number = new Date(
    date.getFullYear(),
    date.getMonth(),
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

  //////////////////////////////////////////////////

  // 모달 부분
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log("열려라");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showLink = () => {
    window.open(
      `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=고갯마루` // 음식점 이름 수정
    );
  };

  const handleAlgo = () => {
    getRecommandStore();
  };

  return (
    <>
      <StyledText>
        <button onClick={handleAlgo}>버튼</button>
        <button onClick={getMonthlyCost}>클릭</button>
        <h3>{checkDayli === 0 ? "내일 맛있게" : "오늘 쓴 금액보다"} </h3>
        <h3>
          {checkDayli === 0
            ? "먹을 수 있는 곳이에요"
            : "저렴하게 먹을 수 있는 곳이에요"}
        </h3>

        <br />
        <img
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzAxMDhfMSAg%2FMDAxNDgzODAyNDIwNzg4.5sRLucgny06iqQ_RBdwnaVtWIVnBvc-Lxsa__Lfc2aMg.-gHlR0au-otgL13tqbKoRoeYvcDl7i_9zp3JslOw_nsg.JPEG.39274520%2FDSC03488.JPG&type=b400"
          alt=""
          width="200px"
        />
        <h4>고갯마루</h4>
        <StyledBtn onClick={handleOpen}>자세히보기</StyledBtn>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">store_name</h2>
              {/* <p id="transition-modal-description"> */}
              <div>
                <img
                  src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzAxMDhfMSAg%2FMDAxNDgzODAyNDIwNzg4.5sRLucgny06iqQ_RBdwnaVtWIVnBvc-Lxsa__Lfc2aMg.-gHlR0au-otgL13tqbKoRoeYvcDl7i_9zp3JslOw_nsg.JPEG.39274520%2FDSC03488.JPG&type=b400"
                  alt="고갯마루"
                  width="200"
                />
                <br />
                tel
                <br />
                address category score_mean
                <br />
                <StyledBtn onClick={showLink}>더 알아보기</StyledBtn>
              </div>

              {/* </p> */}
            </div>
          </Fade>
        </Modal>
      </StyledText>
    </>
  );
};

export default Recommand;
