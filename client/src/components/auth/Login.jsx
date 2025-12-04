// Login.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css'
import { loginThunk } from '../../store/thunks/authThunk.js';
import { useNavigate } from 'react-router-dom';

export default function Login() { // 비동기라 promise 객체 반환함.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  // const [ emailErr, setEmailErr ] = useState('');
  const [ password, setPassword ] = useState('');

  async function handleLogin(e) {
    // 기존 이벤트를 취소해야한다.
    e.preventDefault();

    try {
      // 로그인 요청
      await dispatch(loginThunk({email, password})).unwrap(); // payload쪽만 필요하다. -> unwrap() 쓰자.
      return navigate('/posts', { replace: true });
    } catch (error) {
      console.log(error);
      const code = error.response?.data?.code;
      alert(`로그인을 실패했습니다. ${code}`);
    }
  }

  function validationAndSetEmail(e) {
    const val = e.target.value;
    setEmail(val)
    // if(/^[0-9]+$/.test(val)) {
    //   setEmail(e.target.value)
    //   setEmailErr(null);
    // } else {
    //   setEmailErr('이메일 형식 오류');
    // }
  }

  // 자바스크립트 코드로..리액트는 이런 기능(redirect)이 없음.
  function handleSocial(provider) {
    window.location.replace(`/api/auth/social/${provider}`);
  }

  // ${emailErr ? 'redBorder' : 'greenBorder'} className에 넣을 수 있다.
  return (
    <>
      <form className="login-container" onSubmit={handleLogin}>
        <input type="text" className='input-big-border' onChange={ validationAndSetEmail } placeholder='email' />
        <input type="password" className='input-big-border' onChange={ e => setPassword(e.target.value) } placeholder='password' />
        <button type="submit" className="btn-big bg-gray">Log in</button>
        <div className="text-on-line">or</div>
        <button type="button" className="btn-big bg-img-kakao" onClick={() => {handleSocial('kakao')}}></button>
        <button type="button" className="btn-big bg-light">Sign up</button>
      </form>
    </>
  )
}


