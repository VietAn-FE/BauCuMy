import React, { useState, useEffect } from "react";
import ChartBCSB from "./chartBauCu";
import TheLeBCSB from "./thele";
import DsBangBCSB from "./listbang";
import ChiTietBangBCSB from "./chitietbang";
import KhaoSatBCSB from "./khaosat";
import VideoSection from "./videoSection";
import NewsSection from "./newsSection";

function PageBCSB({ ShowDetailPage }) {
  const [dsBang, setDsBang] = useState([]);
  const [tabNews, setTabNew] = useState("tintuc");
  const config = window.config;

  var today = new Date(),
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

  const getDsBang = () => {
    const myHeaders = new Headers();
    myHeaders.append("Origin", "local.tuoitre.vn");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(config.domainApi + "/api-uselection.htm?m=get_states", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDsBang(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setupMenuScroll = () => {
    // Lấy tất cả các menu item và content
    const menuItems = document.querySelectorAll(".list-menu .item-menu");
    // const contents = document.querySelectorAll(".item-content-scroll");

    // Lặp qua từng menu item và thêm sự kiện click
    menuItems.forEach(function (menuItem) {
      menuItem.addEventListener("click", function () {
        // Loại bỏ lớp active từ tất cả các menu-item
        menuItems.forEach(function (item) {
          item.classList.remove("active");
        });

        // Thêm lớp active cho menu-item hiện tại
        this.classList.add("active");

        // Lấy id của content tương ứng
        const targetId = this.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
          // Cuộn mượt đến vị trí của content
          targetContent.scrollIntoView({
            behavior: "smooth",
            block: "start", // Cuộn để đặt phần trên của nội dung ở đầu trang
          });
        }
      });
    });
  };

  const changeTabNew = (value) => {
    setTabNew(value);
  };

  useEffect(() => {
    setupMenuScroll();
    getDsBang();
  }, []);

  const handShowDetailPage = (bang, data) => {
    ShowDetailPage(bang, data);
  };

  return (
    <div className="main">
      <div className="section__qc">
        <div className="container">
          <div className="bg"></div>
        </div>
      </div>

      <div className="section__menu-scroll">
        <div className="container">
          <div className="box-category-link">
            <div className="title-link-cate active">Bầu cử sơ bộ</div>

            <div
              onClick={() => handShowDetailPage("TTC", "")}
              className="title-link-cate "
            >
              Tổng tuyển cử
            </div>
          </div>
          <div className="list-menu">
            <div data-target="content1" className="item-menu active">
              Diễn biến chính
            </div>
            <div data-target="content2" className="item-menu">
              Tin tức
            </div>

            <div data-target="content3" className="item-menu">
              Thể lệ bầu cử
            </div>

            <div data-target="content4" className="item-menu">
              Xem theo bang
            </div>
            <div data-target="content5" className="item-menu">
              Khảo sát thăm dò ý kiến cử chi
            </div>
          </div>
        </div>
      </div>

      <div id="content1" className="section__main-develop item-content-scroll">
        <div className="container">
          <h2 className="title">Cuộc bầu cử sơ bộ Tổng thống Mỹ năm 2024</h2>

          <span className="days">Cập nhật {date}</span>
          <ChartBCSB
            handShowDetailPage={handShowDetailPage}
            dataBang={dsBang}
          ></ChartBCSB>
        </div>
      </div>

      <div className="section__regula-view item-content-scroll">
        <div className="container">
          <div className="regula-flex">
            <div className="box-left">
              <div className="box-news-content" id="content2">
                <div className="box-menu-tabs">
                  <div
                    className={`item-tabs ${
                      tabNews == "tintuc" ? "active" : ""
                    }`}
                    onClick={() => changeTabNew("tintuc")}
                  >
                    Tin tức
                  </div>

                  <div
                    className={`item-tabs ${
                      tabNews == "phantich" ? "active" : ""
                    }`}
                    onClick={() => changeTabNew("phantich")}
                  >
                    Phân tích
                  </div>

                  <div
                    className={`item-tabs ${
                      tabNews == "giaithich" ? "active" : ""
                    }`}
                    onClick={() => changeTabNew("giaithich")}
                  >
                    Giải thích
                  </div>
                </div>

                <div className="content-tabs">
                  <div
                    className={`show-tabs ${
                      tabNews != "tintuc" ? "hidden" : ""
                    }`}
                  >
                    <NewsSection type="tintuc" tag="news" />
                  </div>

                  <div
                    className={`show-tabs ${
                      tabNews != "phantich" ? "hidden" : ""
                    }`}
                  >
                    <NewsSection type="phantich" tag={config.tagPhanTich} />
                  </div>

                  <div
                    className={`show-tabs ${
                      tabNews != "giaithich" ? "hidden" : ""
                    }`}
                  >
                    <NewsSection type="giaithich" tag={config.tagGiaiThich} />
                  </div>
                </div>
              </div>
              <div id="content3">
                <TheLeBCSB></TheLeBCSB>
              </div>
              <div id="content4">
                <ChiTietBangBCSB
                  handShowDetailPage={handShowDetailPage}
                  dataBang={dsBang}
                ></ChiTietBangBCSB>
              </div>
            </div>

            <div className="box-right">
              <VideoSection />
              <DsBangBCSB
                handShowDetailPage={handShowDetailPage}
                dataBang={dsBang}
              ></DsBangBCSB>
            </div>
          </div>
        </div>
      </div>

      <div id="content5" className="section__vote-opinion item-content-scroll">
        <div className="container">
          <KhaoSatBCSB dataBang={dsBang}></KhaoSatBCSB>
        </div>
      </div>
    </div>
  );
}

export default PageBCSB;
