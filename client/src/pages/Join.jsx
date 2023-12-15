import React from 'react'
import Header from '../components/Header/Header'
import JoinForm from '../components/Join/JoinForm'
import * as auth from '../apis/auth'
import { useNavigate } from 'react-router-dom'
import * as Swal from '../apis/alert'

const Join = () => {

  let navigate = useNavigate();

  // 회원가입 요청
  const join = async ( form ) => {
    console.log(form);

    let response;
    let data;

    try {
      response = await auth.join(form)
    } catch (error) {
      console.error(`${error}`);
      console.error(`회원가입 요청 중 에러가 발생하였습니다.`);
      return;
    }

    data = response.data;
    const status = response.status;
    console.log(`data : ${data}`);
    console.log(`status : ${status}`);

    if( status == 200) {
      console.log(`회원가입 성공!`);
      // alert(`회원 가입 성공!`);
      // navigate('/')
      Swal.alert('회원 가입 성공!', '메인 화면으로 이동됩니다.', "success", () => {navigate("/")})
    }
    else {
      // console.log(`회원가입 실패!`);
      // alert(`회원가입에 실패하였습니다.`);
      Swal.alert('회원가입 실패!', '메인 화면으로 이동됩니다.', "error", () => {navigate("/login")})
    }
  }

  return (
    <>
        <Header />
        <div className='container'>
            {/* <h1>Home</h1>
            <hr />
            <h2>회원가입 페이지</h2>
            <LoginContextConsumer /> */}
            <JoinForm join={join}/>
        </div>
    </>
  )
}

export default Join