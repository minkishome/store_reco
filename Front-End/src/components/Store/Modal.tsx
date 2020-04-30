import React, { useMemo } from 'react';
import './Modal.scss';

const Modal = (params: any) => {
  const {close, data, openModal} =params;


  return (
    <>
      <div className="Modal-overlay" onClick={close} />
      <div className="Modal">
        <p>Modal 입니당</p>
      </div>
    </>
  )
}

export default Modal;