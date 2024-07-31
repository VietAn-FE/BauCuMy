import React, { useState, useEffect } from "react";
import BCSBCom from "./baucusobo";
import KhaoSatBCSB from "./khaosat";
import ChiTietBangBCSB from "./chitietbang";

function ChiTietBang({ bang, ShowDetailPage }) {
  const [dsBang, setDsBang] = useState([]);
  const config = window.config;
  function setupMenuScroll() {
    // Lấy tất cả các menu item và content
    const menuItems = document.querySelectorAll(".list-menu .item-menu");

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
  }

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

  const handShowDetailPage = (bang, data) => {
    ShowDetailPage(bang, data);
  };

  useEffect(() => {
    setupMenuScroll();
    getDsBang();
  }, []);

  return (
    <div className="main">
      <div className="section__qc">
        <div className="container">
          <div className="bg" />
        </div>
      </div>
      <div className="section__menu-scroll">
        <div className="container">
          <div className="box-category-link">
            <div
              onClick={() => handShowDetailPage("BCSB", "")}
              className="title-link-cate"
            >
              Bầu cử sơ bộ
            </div>

            <div
              onClick={() => handShowDetailPage("TTC", "")}
              className="title-link-cate "
            >
              Tổng tuyển cử
            </div>
          </div>
          <div className="list-menu">
            <div data-target="content1" className="item-menu active">
              {bang}
            </div>
            <div data-target="content2" className="item-menu">
              Khảo sát thăm dò ý kiến cử chi
            </div>
            <div data-target="content3" className="item-menu">
              Các bang khác
            </div>
          </div>
        </div>
      </div>
      <div id="content1" className="section__main-develop item-content-scroll">
        <BCSBCom bang={bang} />
      </div>
      <div id="content2" className="section__vote-opinion item-content-scroll">
        <div className="container">
          <KhaoSatBCSB dataBang={dsBang} bang={bang}></KhaoSatBCSB>
        </div>
      </div>

      <div id="content3" className="detail__regula-view item-content-scroll">
        <div className="container mb-30">
          <ChiTietBangBCSB
            dataBang={dsBang}
            handShowDetailPage={handShowDetailPage}
          ></ChiTietBangBCSB>
        </div>
      </div>
    </div>
  );
}

export default ChiTietBang;
