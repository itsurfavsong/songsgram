// PostShow.jsx
import { useEffect, useState } from 'react';
import PostComment from './comments/PostComment.jsx';
import './PostShow.css';
import PostDelete from './PostDelete.jsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postShowThunk } from '../../store/thunks/postShowThunk.js';
import { clearPostShow } from '../../store/slices/postShowSlice.js';

export default function PostShow() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { show } = useSelector(state => state.postShow);
  const [openDeleteFlg, setOpenDeleteFlg] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    dispatch(postShowThunk(id));

    return () => {
      dispatch(clearPostShow());
    }
  }, []);

  function openDeleteModal() {
    setOpenDeleteFlg(true);
  }
  function closeDeleteModal() {
    setOpenDeleteFlg(false);
  }

  const handleClick = () => {
    setLikes(likes + 1);
  };

  return (
    <>
      {
        show && (
          <div className="post-show-container">
            <div className="post-show-post-box bottom-line">
              <img className="post-show-post-img" src={`${show.image}`}></img>
              <div className="post-show-post-info-items">
                <div className="icon-delete" onClick={openDeleteModal} ></div>
                <div className="post-show-post-likes-items">
                  <p>{likes}</p>
                  <button className='icon-heart-fill' onClick={handleClick}></button>
                </div>
              </div>
              <textarea className="post-show-post-constent" defaultValue={show.content}></textarea>
            </div>
            <PostComment id={id} comments={show.comts} />
          </div>
        )
      }
      {
        openDeleteFlg && <PostDelete id={id} setCloseDeleteModal={closeDeleteModal} />
      }
    </>
  )
}
