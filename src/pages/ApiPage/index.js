import React from "react";
import "../../css/api.scss";

function ApiPage() {
  return (
    <div className="apiWrapper">
      <div className="apiBox">
        <div className="apiBoxTitle">Stack Me API</div>
        <div className="apiBoxContent">
          <div className="apiBoxInfo">
            <b>Stack Me</b>는 지금껏 쌓아올린 나를 활용할 수 있도록 API를
            제공합니다.
          </div>

          <div className="apiBoxList">
            <div className="apiBoxLabel">제공 API 목록</div>
            <ul>
              <li>경력 정보 </li>
              <li>프로젝트 정보</li>
            </ul>
          </div>

          <div className="apiBoxAuth">
            <div className="apiBoxLabel">API 인증</div>
            <div className="apiBoxCategoryContent">
              Stack Me API는 사용자 개인 API KEY를 이용하여 인증합니다.
              <br />
              API 요청 시 Header에 API_KEY를 추가하여 호출 합니다.
              <table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>api_key</td>
                    <td>개인 API_KEY</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="apiBoxUser">
            <div className="apiBoxLabel">경력 API</div>
            <div className="apiBoxCategoryContent">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "37.5%" }}>요청 URL</th>
                    <th style={{ width: "12.5%" }}>메서드</th>
                    <th style={{ width: "12.5%" }}>응답방식</th>
                    <th style={{ width: "37.5%" }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>https://stackme.co.kr/api/me/career</code>
                    </td>
                    <td>GET</td>
                    <td>JSON</td>
                    <td>사용자의 모든 경력 정보를 조회합니다.</td>
                  </tr>
                </tbody>
              </table>
              쿼리스트링에 fields 변수를 추가하여 원하는 항목만 받아 올 수
              있습니다. <br />각 항목은 "," 로 구분됩니다. ex)
              ?fields=id,company,... <br />
              <table>
                <thead>
                  <tr>
                    <th>항목 명</th>
                    <th>설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>id</td>
                    <td>경력의 고유 id</td>
                  </tr>
                  <tr>
                    <td>join_date</td>
                    <td>입사 날짜</td>
                  </tr>
                  <tr>
                    <td>end_date</td>
                    <td>퇴사 날짜</td>
                  </tr>
                  <tr>
                    <td>company</td>
                    <td>회사 명</td>
                  </tr>
                  <tr>
                    <td>duty</td>
                    <td>맡은 업무</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="apiBoxProject">
            <div className="apiBoxLabel">프로젝트 API</div>
            <div className="apiBoxCategoryContent">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "37.5%" }}>요청 URL</th>
                    <th style={{ width: "12.5%" }}>메서드</th>
                    <th style={{ width: "12.5%" }}>응답방식</th>
                    <th style={{ width: "37.5%" }}>설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>https://stackme.co.kr/api/me/project</code>
                    </td>
                    <td>GET</td>
                    <td>JSON</td>
                    <td>사용자의 모든 프로젝트 정보를 조회합니다.</td>
                  </tr>
                  <tr>
                    <td>
                      <code>https://stackme.co.kr/api/me/project/id</code>
                    </td>
                    <td>GET</td>
                    <td>JSON</td>
                    <td>사용자의 특정 프로젝트 정보를 조회합니다.</td>
                  </tr>
                </tbody>
              </table>
              쿼리스트링에 fields 변수를 추가하여 원하는 항목만 받아 올 수
              있습니다. <br />각 항목은 "," 로 구분됩니다. ex)
              ?fields=id,title,... <br />
              <table>
                <thead>
                  <tr>
                    <th>항목 명</th>
                    <th>설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>id</td>
                    <td>프로젝트의 고유 id</td>
                  </tr>
                  <tr>
                    <td>type</td>
                    <td>프로젝트 타입</td>
                  </tr>
                  <tr>
                    <td>thumnail</td>
                    <td>프로젝트 썸네일</td>
                  </tr>
                  <tr>
                    <td>title</td>
                    <td>프로젝트 명</td>
                  </tr>
                  <tr>
                    <td>content</td>
                    <td>프로젝트 내용</td>
                  </tr>
                  <tr>
                    <td>skills</td>
                    <td>사용 기술</td>
                  </tr>
                  <tr>
                    <td>url</td>
                    <td>관련 URL</td>
                  </tr>
                  <tr>
                    <td>git_url</td>
                    <td>깃허브 주소</td>
                  </tr>
                  <tr>
                    <td>start_date</td>
                    <td>시작 날짜</td>
                  </tr>
                  <tr>
                    <td>end_date</td>
                    <td>종료 날짜</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiPage;
