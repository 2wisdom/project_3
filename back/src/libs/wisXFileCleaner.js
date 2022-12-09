/**
 * @name wisXFileCleaner
 *
 * @author 2wisdom
 * @since 2022. 12. 09
 *
 * 파일 삭제를 위한 헬퍼 함수
 * 업로드 된 파일의 삭제를 위해 선언
 *
 * ex)
 * 파일삭제
 *
 * ```javascript
 * const { wisXFileCleaner, wisXFileCleanerFromUrl } = require('wisXFileCleaner')
 *
 * // 파일 삭제함수
 * wisXFileCleaner('/public/images/test.png');
 *
 * // url 로부터 파일을 삭제하는 헬퍼 함수
 * wisXFileCleanerFromUrl(new URL('http://example.com/public/images/test.png'));
 * ```
 */
const path = require("path");
const fs = require("fs");
const { UPLOAD_BASE_PATH } = require("../middlewares/uploadFile");
const logger = require("../config/logger");

/**
 * 업로드 된 파일을 삭제한다
 *
 * @author 2wisdom
 * @since 2022. 12. 09
 *
 * @param {string} filePath - 삭제하려는 파일명 ex) /public/images/test.png
 *
 * @return {void}
 *
 * @throw {Error} - 파일경로가 없거나, 삭제에 실패 했을 때, 트리거 된다. 반드시 오류처리를 해야한다.
 */
function wisXFileCleaner(filePath) {
  const localFilePath = path.join(UPLOAD_BASE_PATH, filePath); // C://..../public/images/1670594194098-i16415483953.jpg
  logger.log(2, `${localFilePath}`);

  fs.unlinkSync(localFilePath);
}

/**
 * 업로드 된 파일을 삭제한다
 *
 * 파일의 url 경로를 받아 파일을 삭제한다
 *
 * @author 2wisdom
 * @since 2022. 12. 09
 *
 * @see {wisXFileCleaner}
 *
 * @param {URL} fileUri - 삭제 하려는 파일의 uri
 *
 * @throw {Error} - 파일경로가 없거나, 삭제에 실패 했을 때, 트리거 된다. 반드시 오류처리를 해야한다.
 */
function wisXFileCleanerFromUrl(fileUri) {
  return wisXFileCleaner(fileUri.pathname);
}

exports.wisXFileCleaner = wisXFileCleaner;
exports.wisXFileCleanerFromUrl = wisXFileCleanerFromUrl;
