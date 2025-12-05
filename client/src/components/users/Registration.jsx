import { useDispatch } from 'react-redux';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import { userProfileUploadThunk, userStoreThunk } from '../../store/thunks/userStoreThunk.js';
import { useState } from 'react';

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordCk, setPasswordCk ] = useState('');
  const [ nick, setNick ] = useState('');
  const [ file, setFile ] = useState('');
  const [ preview, setPreview ] = useState('');

  async function handleStore(e) {
    e.preventDefault(); // 원래 하려던 기능을 취소하게 됨.

    try {
      // 파일 업로드 처리
      const resultUpload = await dispatch(userProfileUploadThunk(file)).unwrap();
      const profile = resultUpload.data.path; // 파일 업로드 URL 획득

      // 회원가입 항목 작성
      await dispatch(userStoreThunk({ email, password, passwordCk, nick, profile})).unwrap();

      alert('회원 가입에 성공했습니다. \n다시 로그인하여 주십시오.');

      // 회원가입이 완료되면 로그인 페이지로 이동
      return navigate(`/login`, {replace: true});
    } catch(error) {
      console.log('회원가입 완료', error);
      return alert('회원가입 실패');
    }

  }

  // 이메일 관련 ----------------------------------------------------------------------------
  function validationAndSetEmail(e) {
    const val = e.target.value;
    setEmail(val)
  }

  // 비밀번호 관련 ----------------------------------------------------------------------------
  function validationAndSetPw(e) {
    const val = e.target.value;
    setPassword(val)
  }

  // 비밀번호 double check 관련 ----------------------------------------------------------------------------
  function validationAndSetPwCk(e) {
    const val = e.target.value;
    setPasswordCk(val)
  }

  // 닉네임 관련 ----------------------------------------------------------------------------
  function validationAndSetNick(e) {
    const val = e.target.value;
    setNick(val)
  }

  // 프로필 파일 ----------------------------------------------------------------------------
  function changeFile(e) {
    // 선택 파일 정보 획득(1개의 파일만 올리는걸 전제)
    const file = e.target.files[0];

    // 미리보기
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () => { setPreview(fileReader.result) }); // useState의 preview로 저장함.

    setFile(file);
  }

  return (
    <>
      <form className="registration-container" onSubmit={handleStore}>
        <input type="email" className='input-big-border' onChange={validationAndSetEmail} placeholder='email' />
        <input type="password" className='input-big-border' onChange={validationAndSetPw} placeholder='password' />
        <input type="password" className='input-big-border' onChange={validationAndSetPwCk} placeholder='password check' />
        <input type="text" className='input-big-border' onChange={validationAndSetNick}  placeholder='nick' />
        <input type="file" onChange={changeFile} accept="image/*" />
        {
          preview && (<div className="profile profile-medium" style={{backgroundImage: `url("${preview}")`}}></div>)
        }
        <button type="submit" className="btn-big bg-gray">Sign up</button>
      </form>
    </>
  )
}
