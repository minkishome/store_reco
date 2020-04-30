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
import Modal from "./Modal";
import {Grid} from "@material-ui/core"
// materia-ui 모달 import
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";

const Recommand: FunctionComponent<any> = ({ }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({} as any);
  const [storeList, setStoreList] = useState([] as any);

  useEffect(() => getRecommandStore(), [isModalOpen]);

  const openModalHandler = (data: any) => {
    setModalData(data);
    var t: any = true 
    setIsModalOpen(t);
  };

  const closeModalHandler = () => setIsModalOpen(false);

  
  const getRecommandStore = () => {
    const res = axios({
      method: 'get',
      url: `${_url}/stores/store_list/12341234/`,
      responseType: "json"
    }).then((res) => {
      var temp = [] as any
      var tmp = [] as any
      res.data.map((e: any, idx: Number) => {
        const _name = e.store_name
        const _id = e.store_id
        const _img = e.store_image
        tmp.push([_name, _id, _img])
      });
      setStoreList(tmp)
    })
  }


  

  return (
    <>
    <StyledText>
    <h1>오늘 쓴 금액과 Survey 바탕으로 맛집을 추천해드릴게요</h1>
    <br></br>
      {storeList.map((e: any, idx: number) => {
        return (
          <>
          <div className="box">
            {e[0]}
            <img
              src={e[2]}
              alt=""
              width="200px"
              onClick={() => openModalHandler(e[1])}
            />
            </div>
          </>
        )
      })}
      {isModalOpen ? (
        <Modal
          close={closeModalHandler}
          data={modalData}
          openModal={openModalHandler}
        />
      ) : null}
      </StyledText>
    </>
  )
}
export default Recommand;

