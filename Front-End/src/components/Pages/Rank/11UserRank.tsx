import React, { FunctionComponent, useState, useEffect, Component } from 'react';
import { StyledText } from '../../style';

const UserRank: FunctionComponent<any> = ({ }) => {
  return (
    <>
      <StyledText>
        <h1>UserRank Page</h1>
        <h3>20대 다른사람들은<br />
                오늘 얼마나<br />
                아껴 썼을까요?<br />
        </h3>
        <ul>
          <p>1위 아가얼굴  <input />원</p>
          <p>2위 뚜경뚜경  <input />원</p>
          <p>3위 민키스홈  <input />원</p>
          <p>4위 노발대발  <input />원</p>
          <p>5위 올라프  <input />원</p>
        </ul>
        <button>이전 화면으로 돌아가기 </button>
      </StyledText>
    </>
  )
}

export default UserRank;