import './Header.css';
import { useLocation, useNavigate } from "react-router-dom";
import UserInfo from './UserInfo.jsx';
import { useSelector } from 'react-redux';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.auth);

  const onlyTitleList = ['/login', '/registration'];
  const onlyTitleFlg = onlyTitleList.some(path => path === location.pathname);

  function redirectLogIn() {
    navigate(`/login`);
  }

  function redirectRegistration() {
    navigate(`/registration`);
  }

  function redirectPosts() {
    navigate(`/posts`);
  }

  return (
    <>
      <div className="header-container">
        <div className={`${(onlyTitleFlg && 'header-top') || 'bottom-line header-top-grid'}`}>
          <h1 className={`${(onlyTitleFlg && 'header-top-title-only') || ''}`} onChange={redirectPosts}>Meerkatgram</h1>
          {
            !onlyTitleFlg && (
              <div className='header-top-btn-box'>
                {
                  (isLoggedIn && <button type="button" className='btn-small bg-dark'>Logout</button>)
                  ||
                  <>
                    <button type="button" onClick={redirectLogIn} className='btn-small bg-gray'>Log In</button>
                    <button type="button" onClick={redirectRegistration} className='btn-small bg-light'>Sign Up</button>
                  </>
                }
              </div>
            )
          }
        </div>
        {
          isLoggedIn && <UserInfo />
        }
      </div>
    </>
  )
}
