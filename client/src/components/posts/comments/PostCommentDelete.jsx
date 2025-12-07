import { postCommentDeleteThunk } from '../../../store/thunks/commentDeleteThunk';
import './PostCommentDelete.css';
import { useDispatch } from 'react-redux';

export default function PostCommentDelete({ id, setCloseDeleteFlg }) {
  const dispatch = useDispatch();

  async function handleDelete() {
    try {
      const result = await dispatch(postCommentDeleteThunk(id));

      if (postCommentDeleteThunk.fulfilled.match(result)) {
        alert("댓글이 삭제되었습니다.");
        dispatch();
        return setCloseDeleteFlg();;
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      return alert("삭제 중 오류가 발생했습니다.");
    }
  }

  function closeDeleteModal() {
    setCloseDeleteFlg();
  }

  return (
    <>
      <div className="post-delete-container">
        <div className="post-delete-content-box bg-light">
          <div className="post-delete-content-info">
            <p>삭제된 댓글은 되돌릴 수 없습니다.</p>
            <br />
            <p>정말 삭제하시겠습니까?</p>
          </div>
          <div className="post-delete-btn-box">
            <button type="button" className='btn-medium bg-dark' onClick={handleDelete}>Delete</button>
            <button type="button" className='btn-medium bg-gray' onClick={closeDeleteModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}
