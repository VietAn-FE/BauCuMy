import React, { useState, useEffect } from "react";
import { getSvgWithBang } from "./map";
import AvtD from "../baucusobo/avtdefault.png";

function BCSBCom({ bang }) {
  const [dsUv, setDsUv] = useState([]);
  const [dsUvDefault, setDsUvDefault] = useState([]);
  const [dsUvBang, setDsUvBang] = useState([]);
  const [dsUvBangDefault, setDsUvBangDefault] = useState([]);
  const [status, setstatus] = useState(0);
  const [sortBy, setSortBy] = useState("Tất cả các đảng");
  const config = window.config;

  const today = new Date(),
    date =
      today.getHours() +
      "h" +
      today.getMinutes() +
      " - " +
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();

  useEffect(() => {
    fetch(
      config.domainApi + "/api-uselection.htm?m=get_states%3Fstate%3D" + bang,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        res?.data[0]?.elections_1 && handleSetData(res?.data[0]);
        res?.data[0].status && setstatus(res?.data[0].status);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
    boxMapHover();
  }, [bang]);

  function boxMapHover() {
    document.querySelectorAll(".box-map path").forEach(function (path) {
      path.addEventListener("mouseleave", function () {
        var tooltip = document.querySelector(".box-wrap-board");
        if (tooltip) {
          tooltip.style.display = "none";
        }
      });
      path.addEventListener("mouseenter", function (event) {
        var classList = path.classList;
        if (!classList || classList.length == 0) return;
        var className = classList[0];
        var tooltip = document.querySelector(".box-wrap-board");
        if (className && tooltip) {
          tooltip.style.display = "block";
          // Tính toán vị trí của con trỏ chuột
          var mouseX = event.clientX;
          var mouseY = event.clientY;
          // Lấy kích thước của tooltip
          var tooltipWidth = tooltip.offsetWidth;
          var tooltipHeight = tooltip.offsetHeight;
          // Điều chỉnh vị trí của tooltip để nó gần với con trỏ chuột
          var x = mouseX - tooltipWidth / 1;
          var y = mouseY - tooltipHeight - 2; // Đặt tooltip ở trên con trỏ chuột và cách 5px
          // Kiểm tra nếu tooltip vượt ra khỏi container
          if (x + tooltipWidth > 1312) {
            tooltip.classList.add("left"); // Thêm class left
          } else {
            tooltip.classList.remove("left"); // Loại bỏ class left
          }
          tooltip.style.left = mouseX + "px";
          tooltip.style.top = mouseY + "px";
        }
      });
    });
  }

  const handleSetData = (data) => {
    const transformedData = data?.elections_1.flatMap((party) =>
      party.candidates.map((candidate) => ({
        ...candidate,
        partyDisplay: party.partyDisplay,
        ...party,
      }))
    );
    const sortedData = transformedData.sort((a, b) => b.voteNum - a.voteNum);
    setDsUv(sortedData || []);
    setDsUvDefault(sortedData || []);

    const transformedData1 = [];
    data?.elections_1.forEach((item) => {
      const transformedItem = {
        partyDisplay: item.partyDisplay,
        candidates: item.candidates,
      };
      transformedData1.push(transformedItem);
    });
    setDsUvBang(transformedData1);
    setDsUvBangDefault(transformedData1);
  };

  const handlesortByOption = (event) => {
    setSortBy(event.target.value);
    handleChageDataSort(event.target.value);
  };

  function handleChageDataSort(key) {
    if (key == "Tất cả các đảng") {
      setDsUv(dsUvDefault);
      setDsUvBang(dsUvBangDefault);
      return;
    }
    sortByKeyAndSet(key, dsUvDefault, setDsUv);
    sortByKeyAndSet(key, dsUvBangDefault, setDsUvBang);
  }

  function sortByKeyAndSet(key, defaultData, setFunction) {
    const sortedData = defaultData
      .filter((candidate) => candidate.partyDisplay == key)
      .sort((a, b) => (b.winner ? 1 : -1));
    setFunction(sortedData);
  }

  return (
    <div className="container">
      <h2 className="title">
        Cuộc bầu cử sơ bộ Tổng thống Mỹ tại {bang} năm 2024
      </h2>
      <span className="days">Cập nhật {date}</span>
      <div className="flex-primary">
        <div className="beside-left">
          <div className="box-up">
            <h3 className="text-t">Bầu cử sơ bộ</h3>
            <span className="ratito">Tỷ lệ dưới 0.1% sẽ hiển thị dạng n/a</span>
            <div className={`happen ${status == 2 ? "end" : ""}`}>
              {status == 0 ? "Chưa" : status == 1 ? "Đang" : "Kết Thúc"} bầu cử
              sơ bộ
            </div>
          </div>
          <div className="box-dow">
            <div className="box-select">
              <p className="unv">Ứng cứ viên:</p>
              <select
                className="select-show"
                value={sortBy}
                onChange={handlesortByOption}
              >
                <option value="Tất cả các đảng">Tất cả các đảng</option>
                <option value="Đảng Cộng hòa">Đảng Cộng hòa</option>
                <option value="Đảng Dân chủ">Đảng Dân chủ</option>
              </select>
            </div>
            <div className="tle">
              Tỷ lệ phiếu trên đảng tương ứng
              <span className="icon">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.75 10.25C7.75 10.3983 7.70602 10.5433 7.6236 10.6667C7.54119 10.79 7.42406 10.8861 7.28701 10.9429C7.14997 10.9997 6.99917 11.0145 6.85368 10.9856C6.7082 10.9566 6.57456 10.8852 6.46967 10.7803C6.36478 10.6754 6.29335 10.5418 6.26441 10.3963C6.23548 10.2508 6.25033 10.1 6.30709 9.96299C6.36386 9.82594 6.45999 9.70881 6.58333 9.6264C6.70666 9.54399 6.85167 9.5 7 9.5C7.19892 9.5 7.38968 9.57902 7.53033 9.71967C7.67098 9.86032 7.75 10.0511 7.75 10.25ZM7 3.5C5.62125 3.5 4.5 4.50938 4.5 5.75V6C4.5 6.13261 4.55268 6.25979 4.64645 6.35355C4.74022 6.44732 4.86739 6.5 5 6.5C5.13261 6.5 5.25979 6.44732 5.35356 6.35355C5.44732 6.25979 5.5 6.13261 5.5 6V5.75C5.5 5.0625 6.17313 4.5 7 4.5C7.82688 4.5 8.5 5.0625 8.5 5.75C8.5 6.4375 7.82688 7 7 7C6.86739 7 6.74022 7.05268 6.64645 7.14645C6.55268 7.24021 6.5 7.36739 6.5 7.5V8C6.5 8.13261 6.55268 8.25979 6.64645 8.35355C6.74022 8.44732 6.86739 8.5 7 8.5C7.13261 8.5 7.25979 8.44732 7.35356 8.35355C7.44732 8.25979 7.5 8.13261 7.5 8V7.955C8.64 7.74563 9.5 6.83625 9.5 5.75C9.5 4.50938 8.37875 3.5 7 3.5ZM13.5 7C13.5 8.28558 13.1188 9.54229 12.4046 10.6112C11.6903 11.6801 10.6752 12.5132 9.48744 13.0052C8.29973 13.4972 6.99279 13.6259 5.73192 13.3751C4.47104 13.1243 3.31285 12.5052 2.40381 11.5962C1.49477 10.6872 0.875703 9.52896 0.624899 8.26809C0.374095 7.00721 0.502816 5.70028 0.994786 4.51256C1.48676 3.32484 2.31988 2.30968 3.3888 1.59545C4.45772 0.881218 5.71442 0.5 7 0.5C8.72335 0.50182 10.3756 1.18722 11.5942 2.40582C12.8128 3.62441 13.4982 5.27665 13.5 7ZM12.5 7C12.5 5.9122 12.1774 4.84883 11.5731 3.94436C10.9687 3.03989 10.1098 2.33494 9.10476 1.91866C8.09977 1.50238 6.9939 1.39346 5.92701 1.60568C4.86011 1.8179 3.8801 2.34172 3.11092 3.11091C2.34173 3.8801 1.8179 4.86011 1.60568 5.927C1.39347 6.9939 1.50238 8.09977 1.91867 9.10476C2.33495 10.1098 3.0399 10.9687 3.94437 11.5731C4.84884 12.1774 5.91221 12.5 7 12.5C8.45819 12.4983 9.85617 11.9184 10.8873 10.8873C11.9184 9.85617 12.4983 8.45818 12.5 7Z"
                    fill="#BBBBBB"
                  />
                </svg>
              </span>
            </div>
            <span className="number">Số phiếu</span>
          </div>
          <div className="table">
            {dsUv && dsUv.length > 0 ? (
              dsUv
                .slice(0, 5)
                .map(
                  (
                    {
                      fullName,
                      votePercentStr,
                      partyDisplay,
                      voteStr,
                      winner,
                      avatar,
                    },
                    index
                  ) => (
                    <div
                      className={`row ${
                        partyDisplay == "Đảng Cộng hòa" ? "red" : "blue"
                      }`}
                      key={`bcsb-bang-${index}`}
                    >
                      <div className="author">
                        <span href="" className="avt">
                          <img src={avatar || AvtD} alt="" />
                        </span>
                        <div className="list-name">
                          <span className="name">{fullName}</span>
                          <p className="des">{partyDisplay}</p>
                        </div>
                      </div>
                      <span
                        className={`tlt ${
                          winner == true
                            ? partyDisplay == "Đảng Cộng hòa"
                              ? "red"
                              : "blue"
                            : ""
                        }`}
                      >
                        {votePercentStr}%
                      </span>
                      <span
                        className={`value ${
                          winner == true
                            ? partyDisplay == "Đảng Cộng hòa"
                              ? "red"
                              : "blue"
                            : ""
                        }`}
                      >
                        {voteStr}
                      </span>
                    </div>
                  )
                )
            ) : (
              <div className="yet-event">Đang cập nhật số liệu</div>
            )}
          </div>
        </div>
        <div className="beside-right">
          <div className="box-wrap-map detail">
            <div
              className={`box-map ${
                status == 1 ? "yellow" : status == 2 ? "blue" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: getSvgWithBang(bang) }}
            ></div>
          </div>
          <div className="box-wrap-board">
            <div className="board-top">
              <h3 className="text">{bang}</h3>
              <div className={`happen ${status == 2 ? "end-vote" : ""}`}>
                {status == 0 ? "Chưa" : status == 1 ? "Đang" : "Kết Thúc"} bầu
                cử sơ bộ
              </div>
            </div>
            <div className="box-board-row">
              {dsUvBang &&
                dsUvBang.map(({ candidates, partyDisplay }, index) => (
                  <div
                    className={`col ${
                      partyDisplay == "Đảng Cộng hòa" ? "red" : "blue"
                    }`}
                    key={`box-board-row-${index}`}
                  >
                    <div className="top">
                      <span className="name">{partyDisplay}</span>
                      <span className="tlt">%</span>
                      <span className="promi">Số phiếu</span>
                    </div>
                    <div className="list-col">
                      {}
                      {candidates.map(
                        (
                          { fullName, voteStr, votePercentStr, winner },
                          indexsub
                        ) => (
                          <div
                            className="item-col"
                            key={`box-board-row-item-${indexsub}`}
                          >
                            <span className="name">
                              {fullName}
                              {winner && dsUvBang.length == 1 && (
                                <span className="icon">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M10.5515 14.1608C9.74256 14.4959 8.87533 14.6678 7.99968 14.6667C7.12404 14.6678 6.25681 14.4958 5.44782 14.1607C4.63884 13.8256 3.90405 13.334 3.28568 12.714C2.66569 12.0956 2.17401 11.3608 1.83891 10.5519C1.5038 9.74287 1.33188 8.87563 1.33301 7.99999C1.3319 7.12434 1.50383 6.25711 1.83893 5.44813C2.17404 4.63914 2.6657 3.90435 3.28568 3.28599C3.90405 2.66601 4.63884 2.17434 5.44782 1.83924C6.25681 1.50414 7.12404 1.3322 7.99968 1.33332C8.87533 1.33218 9.74256 1.50411 10.5515 1.83921C11.3605 2.17432 12.0953 2.66599 12.7137 3.28599C13.3337 3.90435 13.8253 4.63914 14.1604 5.44813C14.4955 6.25711 14.6675 7.12434 14.6663 7.99999C14.6675 8.87563 14.4956 9.74287 14.1605 10.5519C13.8253 11.3608 13.3337 12.0956 12.7137 12.714C12.0953 13.334 11.3605 13.8257 10.5515 14.1608ZM11.8044 6.47138C12.0648 6.21103 12.0648 5.78892 11.8044 5.52858C11.5441 5.26823 11.122 5.26823 10.8616 5.52858L7.33301 9.05717L5.80441 7.52858C5.54406 7.26823 5.12195 7.26823 4.8616 7.52858C4.60125 7.78892 4.60125 8.21103 4.8616 8.47138L6.8616 10.4714C7.12195 10.7317 7.54406 10.7317 7.80441 10.4714L11.8044 6.47138Z"
                                      fill={
                                        partyDisplay == "Đảng Cộng hòa"
                                          ? "#DB3831"
                                          : "#2856BE"
                                      }
                                    ></path>
                                  </svg>
                                </span>
                              )}
                            </span>
                            <span
                              className={`tlt ${
                                indexsub == 0
                                  ? partyDisplay == "Đảng Cộng hòa"
                                    ? "red"
                                    : "blue"
                                  : ""
                              }`}
                            >
                              {votePercentStr}%
                            </span>
                            <span
                              className={`promi ${
                                indexsub == 0
                                  ? partyDisplay == "Đảng Cộng hòa"
                                    ? "red"
                                    : "blue"
                                  : ""
                              }`}
                            >
                              {voteStr}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BCSBCom;
