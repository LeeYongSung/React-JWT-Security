import React, { useContext, useEffect } from 'react'
import Header from '../components/Header/Header'
import LoginContextConsumer from '../contexts/LoginContextConsumer'
import { LoginContext } from '../contexts/LoginContextProvider'
import { useNavigate } from 'react-router-dom'

const Admin = () => {

  const { isLogin, roles, userInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect( () => {
    // if( !userInfo ) {
    //   return
    // }
    if( !isLogin ) {
      // alert(`로그인이 필요합니다.`);
      // navigate("/login");
      Swal.alert("로그인이 필요합니다.", "로그인 화면으로 이동합니다.", "warning", () => {navigate("/login")})
      return
    }

    if( !roles.isAdmin ) {
      alert(`권한이 없습니다.`);
      navigate(-1)
      Swal.alert("권한이 없습니다.", "뒤로 이동합니다.", "warning", () => {navigate("/login")})
      return
    }
  }, [userInfo])

  return (
    <>
    {
      isLogin && roles.isAdmin &&
      <>
        <Header />
        <div className='container'>
            <h1>Admin</h1>
            <hr />
            <h2>관리자 페이지</h2>
        </div>
        <center>
          <img src="/img/loading.webp" alt="loading" />
        </center>
      </>
    }
    </>
  )
}

export default Admin