import './Header.css';
import { useLocation, useNavigate } from "react-router-dom";
import UserInfo from './UserInfo.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from "../../store/slices/authSlice.js";
import { logoutThunk } from '../../store/thunks/authThunk.js';

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
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

  async function logout() {
    try {
      const result = await dispatch(logoutThunk());
      if(result.type.endsWith('/rejected')) {
        throw result.payload;
      }
      dispatch(clearAuth());
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
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
                  (isLoggedIn && <button type="button" className='btn-small bg-dark' onClick={logout}>Logout</button>)
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
