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

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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
      console.log(_id);
      const response = axios({
        method: "get",
        url: `${_url}/stores/store_list/${_id}/`, // 알고리즘 url
        responseType: "json",
      }).then((res) => {
        // console.log(res.data);
        // setStoreList(res.data);
        // console.log(storeList);
      });
      alert("연결성공");
    } catch (err) {
      alert(err);
    }
  };

  // 모달 부분
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
    console.log("열려라");
    // console.log(storeList);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showLink = () => {
    window.open(
      `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=고갯마루` // 음식점 이름 수정
    );
  };


  

  return (
    <>
      <StyledText>
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
