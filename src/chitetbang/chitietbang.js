import React, { useState, useEffect } from "react";
import AvtD from "./avtdefault.png";

function ChiTietBangBCSB(props) {
  const [dsBang, setDsBang] = useState([]);
  const [dsBangSl, setDsBangSl] = useState([]);
  const [srDang, setsrDang] = useState(0);
  const [isLoadmore, setLoadmore] = useState(true);
  const config = window.config;

  useEffect(() => {
    setDsBang(props.dataBang.filter((item) => item.status != 0) || []);
    setDsBangSl(props.dataBang.filter((item) => item.status != 0) || []);
  }, [props.dataBang]);

  const formatDate = (time) => {
    let date = "";
    let today = new Date(time);
    return (date =
      today.getHours() +
      "h" +
      today.getMinutes() +
      " - " +
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear());
  };

  const loadmoreDetail = (e) => {
    e.preventDefault();
    setLoadmore(false);
  };

  const sortDang = (value) => {
    setsrDang(value);
  };
  const sortBang = (value) => {
    if (Number(value) == 0) {
      setDsBang(dsBangSl.filter((item) => item.status != 0) || []);
    } else {
      setDsBang(dsBangSl.filter((item) => item.ID == Number(value)) || []);
    }
  };
  return (
    <div className="detail-state">
      <div className="box-top-action">
        <div className="mflex-top">
          <h3 className="title">Chi tiết bầu cử sơ bộ các bang</h3>

          <div className="box-action-select">
            <span className="filter">Lọc theo</span>

            <select
              className="select-col1"
              onChange={(e) => sortDang(e.target.value)}
            >
              <option value="0">Tất cả các đảng</option>
              <option value="1">Đảng dân chủ</option>
              <option value="2">Đảng cộng hoà</option>
            </select>
            <select
              className="select-col2"
              onChange={(e) => sortBang(e.target.value)}
            >
              <option value="0">Tất cả các bang</option>
              {dsBangSl.map((item) => {
                return (
                  <option value={item.ID} key={item.ID}>
                    {item.FullName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <span className="des">
          Thống kê chỉ hiển thị Top 5 ứng viên của mỗi đảng có tỷ lệ bầu cử cao
          nhất
        </span>
      </div>

      <div className="box-total-table">
        <div className="box-list-table">
          {dsBang && dsBang.length > 0
            ? dsBang.map((item, idx) => {
                return (
                  <div
                    className={`item-table ${
                      idx > 4 && isLoadmore ? "hidden" : ""
                    }`}
                    key={idx}
                  >
                    <div className="top">
                      <h3 className="text">{item.FullName}</h3>

                      <span className="tlt">
                        Tỷ lệ dưới 0.1% sẽ hiển thị dạng n/a
                      </span>
                      {Number(srDang) == 0 && item.status == 2 ? (
                        <div className="end-vote">Kết thúc bầu cử sơ bộ</div>
                      ) : Number(srDang) == 0 && item.status == 1 ? (
                        <div className="happen">Đang bầu cử sơ bộ</div>
                      ) : (
                        ""
                      )}
                      {Number(srDang) == 1 &&
                      item?.elections_1?.filter(
                        (n) => n.partyDisplay == "Đảng Dân chủ"
                      )?.[0]?.status == 2 ? (
                        <div className="end-vote">Kết thúc bầu cử sơ bộ</div>
                      ) : Number(srDang) != 0 &&
                        item?.elections_1?.filter(
                          (n) => n.partyDisplay == "Đảng Dân chủ"
                        )?.[0]?.status == 1 ? (
                        <div className="happen">Đang bầu cử sơ bộ</div>
                      ) : (
                        ""
                      )}

                      {Number(srDang) == 2 &&
                      item?.elections_1?.filter(
                        (n) => n.partyDisplay == "Đảng Cộng hòa"
                      )?.[0]?.status == 2 ? (
                        <div className="end-vote">Kết thúc bầu cử sơ bộ</div>
                      ) : Number(srDang) != 0 &&
                        item?.elections_1?.filter(
                          (n) => n.partyDisplay == "Đảng Cộng hòa"
                        )?.[0]?.status == 1 ? (
                        <div className="happen">Đang bầu cử sơ bộ</div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="row">
                      <div
                        className={`col blue ${
                          Number(srDang) == 2 ? "hidden" : ""
                        }`}
                      >
                        <div className="col-up">
                          <span className="name">Đảng dân chủ</span>

                          <span className="tlt">%</span>

                          <span className="promi">Số phiếu</span>
                        </div>

                        <div className="col-list">
                          {item?.elections_1?.filter(
                            (n) => n.partyDisplay == "Đảng Dân chủ"
                          ).length > 0 ? (
                            item?.elections_1
                              ?.filter(
                                (n) => n.partyDisplay == "Đảng Dân chủ"
                              )?.[0]
                              ?.candidates.map((itemChild, idxChild) => {
                                return (
                                  <div className="item-col" key={idxChild}>
                                    <div className="author">
                                      <span className="avt">
                                        <img
                                          src={
                                            itemChild.avatar
                                              ? itemChild.avatar
                                              : AvtD
                                          }
                                          alt={itemChild.fullName}
                                        />
                                      </span>

                                      <div className="cnt">
                                        <span className="name">
                                          {itemChild.fullName}
                                          {itemChild.winner ? (
                                            <span className="icon">
                                              <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M13.5085 18.4712C12.3961 18.932 11.2037 19.1684 9.99968 19.1668C8.79567 19.1684 7.60323 18.932 6.49088 18.4712C5.37852 18.0104 4.36819 17.3344 3.51793 16.4819C2.66544 15.6317 1.98939 14.6213 1.52862 13.509C1.06785 12.3966 0.831455 11.2042 0.833015 10.0002C0.831481 8.79616 1.06789 7.60372 1.52866 6.49137C1.98942 5.37901 2.66546 4.36868 3.51793 3.51842C4.36819 2.66595 5.37852 1.98991 6.49088 1.52914C7.60323 1.06838 8.79567 0.831969 9.99968 0.833504C11.2037 0.831944 12.3961 1.06834 13.5085 1.52911C14.6209 1.98988 15.6312 2.66593 16.4814 3.51842C17.3339 4.36868 18.0099 5.37901 18.4707 6.49137C18.9315 7.60372 19.1679 8.79616 19.1663 10.0002C19.1679 11.2042 18.9315 12.3966 18.4707 13.509C18.01 14.6213 17.3339 15.6317 16.4814 16.4819C15.6312 17.3344 14.6209 18.0105 13.5085 18.4712ZM15.2312 7.89834C15.5892 7.54036 15.5892 6.95996 15.2312 6.60198C14.8732 6.244 14.2928 6.244 13.9348 6.60198L9.08301 11.4538L6.98119 9.35198C6.62321 8.994 6.04281 8.994 5.68483 9.35198C5.32685 9.70996 5.32685 10.2904 5.68483 10.6483L8.43483 13.3983C8.79281 13.7563 9.37321 13.7563 9.73119 13.3983L15.2312 7.89834Z"
                                                  fill="#2856BE"
                                                />
                                              </svg>
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </span>

                                        <p className="des">Đảng Dân chủ</p>
                                      </div>
                                    </div>

                                    <span
                                      className={`tlt ${
                                        itemChild.winner ? "blue" : ""
                                      }`}
                                    >
                                      {itemChild.votePercentStr &&
                                      itemChild.votePercentStr > 0.1
                                        ? itemChild.votePercentStr + "%"
                                        : "n/a"}
                                    </span>

                                    <span
                                      className={`promi ${
                                        itemChild.winner ? "blue" : ""
                                      }`}
                                    >
                                      {itemChild.voteNum.toLocaleString()}
                                    </span>
                                  </div>
                                );
                              })
                          ) : (
                            <div className="yet-event">
                              Đang cập nhật số liệu
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className={`col red ${
                          Number(srDang) == 1 ? "hidden" : ""
                        }`}
                      >
                        <div className="col-up">
                          <span className="name">Đảng cộng hoà</span>

                          <span className="tlt">%</span>

                          <span className="promi">Số phiếu</span>
                        </div>

                        <div className="col-list">
                          {item?.elections_1?.filter(
                            (n) => n.partyDisplay == "Đảng Cộng hòa"
                          ).length > 0 ? (
                            item?.elections_1
                              ?.filter(
                                (n) => n.partyDisplay == "Đảng Cộng hòa"
                              )?.[0]
                              ?.candidates.map((itemChild, idxChild) => {
                                return (
                                  <div className="item-col" key={idxChild}>
                                    <div className="author">
                                      <span className="avt">
                                        <img
                                          src={
                                            itemChild.avatar
                                              ? itemChild.avatar
                                              : AvtD
                                          }
                                          alt={itemChild.fullName}
                                        />
                                      </span>

                                      <div className="cnt">
                                        <span className="name">
                                          {itemChild.fullName}
                                          {itemChild.winner ? (
                                            <span className="icon">
                                              <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M13.5085 18.4712C12.3961 18.932 11.2037 19.1684 9.99968 19.1668C8.79567 19.1684 7.60323 18.932 6.49088 18.4712C5.37852 18.0104 4.36819 17.3344 3.51793 16.4819C2.66544 15.6317 1.98939 14.6213 1.52862 13.509C1.06785 12.3966 0.831455 11.2042 0.833015 10.0002C0.831481 8.79616 1.06789 7.60372 1.52866 6.49137C1.98942 5.37901 2.66546 4.36868 3.51793 3.51842C4.36819 2.66595 5.37852 1.98991 6.49088 1.52914C7.60323 1.06838 8.79567 0.831969 9.99968 0.833504C11.2037 0.831944 12.3961 1.06834 13.5085 1.52911C14.6209 1.98988 15.6312 2.66593 16.4814 3.51842C17.3339 4.36868 18.0099 5.37901 18.4707 6.49137C18.9315 7.60372 19.1679 8.79616 19.1663 10.0002C19.1679 11.2042 18.9315 12.3966 18.4707 13.509C18.01 14.6213 17.3339 15.6317 16.4814 16.4819C15.6312 17.3344 14.6209 18.0105 13.5085 18.4712ZM15.2312 7.89834C15.5892 7.54036 15.5892 6.95996 15.2312 6.60198C14.8732 6.244 14.2928 6.244 13.9348 6.60198L9.08301 11.4538L6.98119 9.35198C6.62321 8.994 6.04281 8.994 5.68483 9.35198C5.32685 9.70996 5.32685 10.2904 5.68483 10.6483L8.43483 13.3983C8.79281 13.7563 9.37321 13.7563 9.73119 13.3983L15.2312 7.89834Z"
                                                  fill="#DB3831"
                                                />
                                              </svg>
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </span>

                                        <p className="des">Đảng Cộng hòa</p>
                                      </div>
                                    </div>

                                    <span
                                      className={`tlt ${
                                        itemChild.winner ? "red" : ""
                                      }`}
                                    >
                                      {itemChild.votePercentStr &&
                                      itemChild.votePercentStr > 0.1
                                        ? itemChild.votePercentStr + "%"
                                        : "n/a"}
                                    </span>

                                    <span
                                      className={`promi ${
                                        itemChild.winner ? "red" : ""
                                      }`}
                                    >
                                      {itemChild.voteNum.toLocaleString()}
                                    </span>
                                  </div>
                                );
                              })
                          ) : (
                            <div className="yet-event">
                              Đang cập nhật số liệu
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bottom">
                      <div className="mflex">
                        <div className="m-left">
                          <div className="m-top">
                            {Number(srDang) == 0 && item.status == 2 ? (
                              <div className="end-vote">
                                Kết thúc bầu cử sơ bộ
                              </div>
                            ) : Number(srDang) == 0 && item.status == 1 ? (
                              <div className="happen">Đang bầu cử sơ bộ</div>
                            ) : (
                              ""
                            )}
                            {Number(srDang) == 1 &&
                            item?.elections_1?.filter(
                              (n) => n.partyDisplay == "Đảng Dân chủ"
                            )?.[0]?.status == 2 ? (
                              <div className="end-vote">
                                Kết thúc bầu cử sơ bộ
                              </div>
                            ) : Number(srDang) != 0 &&
                              item?.elections_1?.filter(
                                (n) => n.partyDisplay == "Đảng Dân chủ"
                              )?.[0]?.status == 1 ? (
                              <div className="happen">Đang bầu cử sơ bộ</div>
                            ) : (
                              ""
                            )}

                            {Number(srDang) == 2 &&
                            item?.elections_1?.filter(
                              (n) => n.partyDisplay == "Đảng Cộng hòa"
                            )?.[0]?.status == 2 ? (
                              <div className="end-vote">
                                Kết thúc bầu cử sơ bộ
                              </div>
                            ) : Number(srDang) != 0 &&
                              item?.elections_1?.filter(
                                (n) => n.partyDisplay == "Đảng Cộng hòa"
                              )?.[0]?.status == 1 ? (
                              <div className="happen">Đang bầu cử sơ bộ</div>
                            ) : (
                              ""
                            )}
                            {/* 
                            <span className="ut">
                              Ước tính 45% cử tri bầu cử
                            </span> */}
                          </div>

                          <span className="update-text">
                            {Number(srDang) == 0 &&
                              "Cập nhật " + formatDate(item.modifiedDate)}
                            {Number(srDang) == 1 &&
                            item?.elections_1?.filter(
                              (n) => n.partyDisplay == "Đảng Dân chủ"
                            ).length > 0
                              ? "Cập nhật " +
                                formatDate(
                                  item?.elections_1?.filter(
                                    (n) => n.partyDisplay == "Đảng Dân chủ"
                                  )?.[0]?.extractedAt
                                )
                              : ""}
                            {Number(srDang) == 2 &&
                            item?.elections_1?.filter(
                              (n) => n.partyDisplay == "Đảng Cộng hòa"
                            ).length > 0
                              ? "Cập nhật " +
                                formatDate(
                                  item?.elections_1?.filter(
                                    (n) => n.partyDisplay == "Đảng Cộng hòa"
                                  )?.[0]?.extractedAt
                                )
                              : ""}
                          </span>
                        </div>

                        <div
                          className="view-detail"
                          onClick={() =>
                            props.handShowDetailPage("CTB", item.FullName)
                          }
                        >
                          Xem chi tiết
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        {isLoadmore && dsBang.length > 5 ? (
          <a href="" onClick={(e) => loadmoreDetail(e)} className="more">
            Xem thêm
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ChiTietBangBCSB;
