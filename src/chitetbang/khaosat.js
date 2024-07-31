import React, { useState, useEffect } from "react";
import AvtD from "./avtdefault.png";

function KhaoSatBCSB(props) {
  const [dsRequest, setDsRequest] = useState([]);
  const [dsRequestSL, setDsRequestSl] = useState([]);
  const config = window.config;

  const getKhaoSat = (addr) => {
    const myHeaders = new Headers();
    myHeaders.append("Origin", "local.tuoitre.vn");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      config.domainApi + "/api-uselection.htm?m=get_exit_polls&state=" + addr,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDsRequest(data.data);
        setDsRequestSl(data.data?.[0]?.exitPoll?.questions || []);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getKhaoSat(props.bang);
  }, [props.bang]);

  const sortQuest = (value) => {
    if (value == 0) {
      setDsRequestSl(dsRequest?.[0]?.exitPoll?.questions);
    } else {
      setDsRequestSl(
        dsRequest?.[0]?.exitPoll?.questions.filter((n) => n.mxId == value)
      );
    }
  };

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

  return (
    <div className="box-ks mb-30">
      {dsRequestSL && dsRequestSL.length > 0 ? (
        <div>
          <div className="box-vote-top">
            <div className="mflex-top">
              <h3 className="title">
                Khảo sát thăm dò ý kiến cử tri tại bang {props.bang}
              </h3>
            </div>

            <p className="sapo">
              Khảo sát chỉ mang tính chất tham khảo trên một phần nhỏ cử chi
              tham gia bầu cử và kết quả trên không đại diện cho toàn bộ cử chi
              và người dân và Mỹ <br />
              Thống kê chỉ hiển thị top 2 ứng viên có nhiều cử tri bầu chọn nhất
              trong số người tham gia khảo sát và các nhóm đối tượng có tỷ lệ
              thấp hơn 0.1% sẽ hiển thị n/a
            </p>

            <div className="fflex-cus">
              <span className="text-sl">Chọn câu hỏi</span>

              <select
                className="sl-col"
                onChange={(e) => sortQuest(e.target.value)}
              >
                <option value="0">Tổng hợp</option>
                {dsRequest?.[0]?.exitPoll?.questions.map((item, idx) => {
                  return (
                    <option value={item.mxId} key={idx}>
                      {item.display}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="box-table">
            {dsRequestSL.map((item, idx) => {
              return (
                <div className="box-opinion" key={idx}>
                  <div className="table-scroll">
                    <div className="opinion-text">
                      <h3 className="title">{item.display}</h3>
                    </div>

                    <div className="opinion-up">
                      <div className="party">
                        {item?.table_answers?.[0]?.[0]?.label}
                      </div>

                      <div className="box-col">
                        <div className="col-top">
                          <div className="col-text">
                            <span className="text-group">
                              {item?.table_answers?.[0]?.[1]?.label}
                            </span>
                            <span className="text-group">
                              {item?.table_answers?.[0]?.[1]?.des}
                            </span>
                          </div>
                          {item?.table_answers?.[0]
                            .slice(2)
                            .map((itemCol, colidx) => {
                              return (
                                <div className="col-vlue" key={colidx}>
                                  <span className="number">
                                    {itemCol.label}
                                  </span>

                                  <span className="number">{itemCol.des}%</span>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>

                    <div className="box-row-author">
                      <div
                        className={`row-item ${
                          item?.table_answers.filter(
                            (n) => n[0] == "Đảng cộng hòa"
                          ).length > 0
                            ? ""
                            : "hidden"
                        }`}
                      >
                        <div className="party red">Đảng Cộng hoà</div>

                        <div className="col-item">
                          {item?.table_answers
                            .filter((n) => n[0] == "Đảng cộng hòa")
                            .map((itemCol, colidx) => {
                              return (
                                <div className="col" key={colidx}>
                                  <div className="author">
                                    <span className="avt">
                                      <img
                                        src={itemCol[1]?.avatar || AvtD}
                                        alt=""
                                      />
                                    </span>

                                    <span className="name">
                                      {itemCol[1]?.label}
                                    </span>
                                  </div>
                                  {itemCol
                                    .slice(2)
                                    .map((itemColValue, colidxvl) => {
                                      return (
                                        <div className="number" key={colidxvl}>
                                          {itemColValue > 0.1
                                            ? itemColValue + "%"
                                            : "n/a"}
                                        </div>
                                      );
                                    })}
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      <div
                        className={`row-item ${
                          item?.table_answers.filter(
                            (n) => n[0] == "Đảng dân chủ"
                          ).length > 0
                            ? ""
                            : "hidden"
                        }`}
                      >
                        <div className="party blue">Đảng Dân chủ</div>

                        <div className="col-item">
                          {item?.table_answers
                            .filter((n) => n[0] == "Đảng dân chủ")
                            .map((itemCol, colidx) => {
                              return (
                                <div className="col" key={colidx}>
                                  <div className="author">
                                    <span className="avt">
                                      <img
                                        src={itemCol[1]?.avatar || AvtD}
                                        alt=""
                                      />
                                    </span>

                                    <span className="name">
                                      {itemCol[1]?.label}
                                    </span>
                                  </div>
                                  {itemCol
                                    .slice(2)
                                    .map((itemColValue, colidxvl) => {
                                      return (
                                        <div className="number" key={colidxvl}>
                                          {itemColValue > 0.1
                                            ? itemColValue + "%"
                                            : "n/a"}
                                        </div>
                                      );
                                    })}
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      <div className="row-update">
                        <span className="text-t">
                          {item.respondents.toLocaleString()} người tham gia
                          khảo sát
                        </span>

                        <span className="text-t">
                          Cập nhật{" "}
                          {formatDate(dsRequest?.[0]?.exitPoll?.extractedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default KhaoSatBCSB;
