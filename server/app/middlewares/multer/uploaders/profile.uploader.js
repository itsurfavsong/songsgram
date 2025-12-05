/**
 * @file app/middlewares/multer/uploaders/profile.uploader.js
 * @description 프로필 사진 업로더
 * 251127 v1.0.0 BSong1 init
 */
import multer from 'multer';
import myError from '../../../errors/customs/my.error.js'
import { BAD_FILE_ERROR } from '../../../../configs/responseCode.config.js';
import fs from 'fs';
import dayjs from 'dayjs';
import pathUtil from '../../../utils/path/path.util.js'

/**
 * 프로필 이미지 업로더 처리 미들웨어
 * @param {import("express").Request} req
 * @param {import("express").Respose} res
 * @param {import("express").NextFunction} next
 */
export default function(req, res, next) {  // 함수 모음집(closure)
  // multer 객체 정의
  const upload = multer({
    // storage: 파일을 저장할 위치를 상세하게 제어하는 프로퍼티
    storage: multer.diskStorage(
      {
        // 파일 저장 경로 설정
        destination(req, file, callback) { // multer 자체적인 callback
          // 저장 디렉토리 설정
          const fullPath = pathUtil.getProfilesImagePath();
            // 해당 디렉토리가 없으면 생성하는 처리를 진행한다.
            fs.mkdirSync(
              fullPath,
              {
                recursive: true, // 중간 디렉토리까지 모두 생성
                mode: 0o755, // 디렉토리 권한 설정 rwxr(생성자 권한)-xr(그룹 유저 권한)-x(기타 유저 권한)
              }
            );


          callback(null, fullPath); // 에러 혹은 null 들어왔을 때 multer의 처리 방식이 다르다. 에러는 에러 처리, null은 그냥 넘어가는...
        },
        // 파일명 설정
        filename(req, file, callback) {
          // 저장할 파일명 생성
          const uniqueFileName = `${dayjs().format('YYYYMMDD')}_${crypto.randomUUID()}`; // 시간을 제목에 넣어주는게 포인트.
          // 저장할 파일 PATH 생성
          const fileNameParts = file.originalname.split('.'); // 유저가 보내온 이름+확장자 = originalname
          const ext = fileNameParts[fileNameParts.length - 1].toLowerCase(); // 파일명을 '.'로 분리해 마지막 요소인 확장자를 가져오고, 소문자로 통일해 관리한다.

          callback(null, `${uniqueFileName}.${ext}`); // next와 비슷한 처리를 진행한다.
        }
      },
    ),
    // fileFilter: 파일 필터링 처리를 제어하는 프로퍼티
    fileFilter(req, file, callback) {
      if(!file.mimetype.startsWith('image/')) { // mimetype -> 이 파일이 어떤 형식으로 이루어졌는지 알아보자!
        return callback(myError('이미지 파일이 아님', BAD_FILE_ERROR));
      }
      callback(null, true);
    },
    // limits: 파일 사이즈 제한, 파일 개수 제한
    limits:{
      fileSize: parseInt(process.env.FILE_USER_PROFILE_SIZE)
    }
  }).single('profile');

  // 예외 처리
  upload(req, res, err => {
    if(err instanceof multer.MulterError || err) {
      next(myError(err.message, BAD_FILE_ERROR));
    }
    next();
  });
}
