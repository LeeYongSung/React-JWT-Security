import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import LoginContextConsumer from '../contexts/LoginContextConsumer'
import UserForm from '../components/User/UserForm'
import * as auth from '../apis/auth'
import { LoginContext } from '../contexts/LoginContextProvider'
import { useNavigate } from 'react-router-dom'
import * as Swal from '../apis/alert'

const User = () => {

  const [ userInfo, setUserInfo ] = useState();
  const { isLogin, loginCheck, roles, logout } = useContext(LoginContext);

  let navigate = useNavigate();

  // 회원 정보 조회 - /user/info
  const getUserInfo = async () => {

    // loginCheck();

    // 비로그인 또는 USER 권한이 없으면 ➡ 로그인 페이지로 이동
    if( !isLogin || !roles.isUser ) {
      navigate("/login")
      return
    }

    const response = await auth.info()
    const data = response.data;
    console.log(`getUserInfo`);
    console.log(`data : ${data}`);
    setUserInfo(data);


  }

  // 회원 정보 수정
  const updateUser = async (form) => {
    console.log(form);

    let response;
    let data;

    try {
      response = await auth.update(form)
    } catch (error) {
      console.error(`error :  ${error}`);
      console.error(`회원정보 수정 중 에러가 발생하였습니다.`);
    }

    data = response.data;
    const status = response.status;
    console.log(`data : ${data}`);
    console.log(`status : ${status}`);

    if( status == 200 ) {
      // console.log(`회원정보 수정 성공!`);
      // alert(`회원정보 수정 성공!`);
      Swal.alert('회원 수정 성공!', '로그인 화면으로 이동됩니다.', "success", () => {logout();})
      logout();
    }
    else {
      // console.log(`회원정보 수정 실패!`);
      // alert(`회원정보 수정 실패!`);
      Swal.alert('회원 수정 실패!', '수정 화면으로 이동됩니다.', "success", () => {navigate("/user");})
    }
  }

  // 회원 탈퇴
  const deleteUser = async (userId) => {
    console.log(userId);

    let response;
    let data;

    try {
      response = await auth.remove(userId);
    } catch (error) {
      console.error(`error :  ${error}`);
      console.error(`회원탈퇴 중 에러가 발생하였습니다.`);
      return;
    }

    data = response.data;
    const status = response.status;

    if( status == 200 ) {
      console.log(`회원삭제 성공!`);
      alert(`회원삭제 성공!`);
      logout();
    }
    else {
      console.log(`회원삭제 실패!`);
      alert(`회원삭제 실패!`);
    }
  }

  useEffect( () => {
    if( !isLogin ) {
      
      return
    }
    getUserInfo();
  }, [isLogin])

  return (
    <>
        <Header />
        <div className='container'>
            {/* <h1>Home</h1>
            <hr />
            <h2>사용자 페이지</h2>
            <LoginContextConsumer /> */}
            <UserForm userInfo={userInfo} updateUser={updateUser} deleteUser={deleteUser} />
        </div>
    </>
  )
}

export default User