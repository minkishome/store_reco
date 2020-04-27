import React, { Component, useMemo } from 'react';
import styled from 'styled-components';
import { url as _url } from '../../url';
import axios from 'axios';
import { StyledText, StyledBtn } from '../style';
import KaKaoLogin from 'react-kakao-login';
import { Link } from 'react-router-dom';


declare const window: any;
interface State {
  data: any;
}

class KakaoSignUp extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: 'kakao'
    }
  }


  responseKaKao = async (res: any) => {
    this.setState({
      data: res
    })
    const semi_email = JSON.stringify(this.state.data.profile.kakao_account.email)
    const _email = semi_email.replace(/^"+|"+$/g, '')
    // const semi_age = JSON.stringify(this.state.data.profile.kakao_account.age_range[0])
    // const s_age = semi_age.replace(/^"+|"+$/g, '')
    // const _age = parseInt(s_age)

    try {
      const response = await axios({
        method: "get",
        // url: `${_url}/api/user_exist/`,
        // url: `${_url}/api/user_exist/${_email}/`,
        url: `${_url}/api/user_exist/${JSON.stringify(this.state.data.profile.id)}/`,
        responseType: "json"
      });
      const msg: string = JSON.stringify(response.data.message)
      if (msg == "true") {
        window.sessionStorage.setItem('id', JSON.stringify(this.state.data.profile.id));
        alert('로그인되었습니다')
        window.location.href='http://localhost:3000/#fifthPage';
      } else {
        try {
          const signup_response = await axios({
            method: "post",
            url: `${_url}/api/user_list/`,
            data: {
              password: 1234,
              email: _email,
              kakao_id: JSON.stringify(this.state.data.profile.id),
              nickname: JSON.stringify(this.state.data.profile.properties.nickname),
              image: JSON.stringify(this.state.data.profile.properties.profile_image),
              // ages: _age,
            },
            responseType: "json"
          });
          // 회원가입 -> Survey 연결 부분
          alert(signup_response)
          return (
            <StyledBtn data-menuanchor="thirdPage">
            {/* <a href="#thirdPage">계속하기</a> */}
            <Link to="/#thirdPage">
              계속하기
            </Link>
          </StyledBtn>
          )
        }
        catch (err) {
          sessionStorage.clear()
          alert(err);
        }
      }
    }
    catch (err) {
      sessionStorage.clear()
      alert(err);
    }
  }

  // responseKaKao = (res: any) => {
  //   this.setState({
  //     data: res
  //   })
  //   // alert(JSON.stringify(this.state.data.profile.id))  // 카카오 고유 id
  //   // alert(JSON.stringify(this.state.data.profile.properties.nickname))  // 닉네임
  //   // alert(JSON.stringify(this.state.data.profile.properties.profile_image))  // 프로필 이미지 링크
  //   // alert(JSON.stringify(this.state.data.profile.kakao_account.email))  // 이
  //   // alert(JSON.stringify(this.state.data.profile.kakao_account.age_range[0]))  // 연령대 (2)
  // }

  responseFail = (err) => {
    alert(err);
  }

  render() {
    return (
      <>
        <StyledText>
          <h1>카카오톡 간편 로그인</h1>
          <h4>로그인 후 더 많은 혜택을 누리세요!</h4>
          <StyledBtn data-menuanchor="thirdPage">
            {/* <a href="#thirdPage">계속하기</a> */}
            <Link to="/#thirdPage">
              계속하기
            </Link>
          </StyledBtn>
          <br></br>
          <KaKaoBtn
            jsKey={'2b67838751764359be17923f29aa820e'}
            buttonText="KaKao"
            onSuccess={this.responseKaKao}
            onFailure={this.responseFail}
            getProfile={true}
          />

        </StyledText>
      </>
    );
  }
}
const StKaKaoLogin = styled.div`
    cursor: pointer;
    /* border-radius:10px; */
    /* width: 200px; */
    /* &:hover{
        box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19);
    } */
`;

const KaKaoBtn = styled(KaKaoLogin)`
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
    }
`

export default KakaoSignUp;