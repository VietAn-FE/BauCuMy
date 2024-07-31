import React, { useState, useEffect } from "react";
import moment from "moment";
import vi from "moment/locale/vi";

function NewsSection({ type, tag }) {
  const [dataNews, setDateNew] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoad, setLoad] = useState(true);

  const config = window.config;

  const callApi = () => {
    var url = "";
    if (type && type == "tintuc") {
      url =
        config.domainNews +
        config.urlNews +
        "&&index=" +
        page +
        "&top=" +
        config.pageSize;
    } else {
      url =
        config.domainNews +
        "/api-getlistnewstagbyurl.htm?c=getdata&tagurl=" +
        tag +
        "&page=" +
        page +
        "&size=" +
        config.pageSize;
    }

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDateNew((odd) => [...odd, ...data.Data]);
        data.Data.length < 6 && setLoad(false);
        console.log("news", data.Data);
      })
      .catch((error) => console.error(error));
  };

  const loadNews = () => {
    setPage(page + 1);
  };

  const formatDate = (time) => {
    let date = "";
    let today = new Date(time);
    return (date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear());
  };

  useEffect(() => {
    callApi();
  }, [page]);

  return (
    <div
      className="box-category box-border-top"
      data-layout="40"
      data-key="keycd"
    >
      <div className="box-category-middle">
        {dataNews.map((items, idx) => {
          return (
            <div className="box-category-flex" key={idx}>
              <div className="box-time">
                <span className="days">
                  {moment(items.DistributionDate, "YYYYMMDD").fromNow()}
                </span>
                <span className="time">
                  {formatDate(Date.parse(items.DistributionDate))}
                </span>
              </div>

              <div className="box-category-item">
                <a
                  className="box-category-link-with-avatar img-resize"
                  href="value-news-url"
                  title={items.Title}
                  data-id="value-newsid"
                  // data-newstype="1"
                >
                  <img
                    data-type="avatar"
                    src={
                      config.domainImgNew +
                        "/zoom/456_285/" +
                        items.Avatar.replace("https://cdn.tuoitre.vn", "") ||
                      items.Avatar2.replace("https://cdn.tuoitre.vn", "")
                    }
                    className="box-category-avatar"
                    alt={items.Title}
                  />
                </a>
                <div className="box-category-content">
                  <a
                    className="box-category-category"
                    href={items.ZoneUrl}
                    title={items.ZoneName}
                  >
                    {items.ZoneName}
                  </a>
                  <div className="box-content-title">
                    <h3 className="box-title-text">
                      <a
                        data-type="title"
                        data-linktype="newsdetail"
                        data-id="data-news-id"
                        className="box-category-link-title"
                        data-newstype="value-news-type"
                        href="value-news-url"
                        title={items.Title}
                      >
                        {items.Title}
                      </a>
                    </h3>
                  </div>
                  <p
                    data-type="sapo"
                    className="box-category-sapo"
                    data-trimline="4"
                  >
                    {items.Sapo}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isLoad == true ? (
        <div onClick={() => loadNews()} className="views">
          Xem thêm
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default NewsSection;
