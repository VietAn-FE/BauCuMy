import React, { useState, useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiper-bundle.min.css";

function VideoSection() {
  const config = window.config;
  const [dataVideo, setdataVideo] = useState([]);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const getData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(config.urlVideo, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let bigGroups = [];
        for (let i = 0; i < data.Data.length; i += 3) {
          let bigGroup = data.Data.slice(i, i + 3);
          bigGroups.push(bigGroup);
        }
        setdataVideo(bigGroups);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="box-meeting">
      <div className="box-category" data-layout="41" data-key="keycd">
        <div className="box-category-top">
          <h2>
            <a
              className="box-category-title"
              href="value-zone-url"
              title="value-zone-alt"
            >
              Video
            </a>
          </h2>

          <div className="box-action">
            <div className="event-meeting-prev" onClick={() => handlePrev()}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="#565656"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>

            <div className="event-meeting-next" onClick={() => handleNext()}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#565656"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          className="swiper event-meeting-sw"
          ref={sliderRef}
        >
          {dataVideo.map((item, idx) => {
            return (
              <SwiperSlide
                className="swiper-slide"
                key={`achievements-item-${idx}`}
              >
                <div className="box-category-middle">
                  {item.map((itemChild, idxc) => {
                    return (
                      <div className="box-category-item" key={idxc}>
                        <a
                          className="box-category-link-with-avatar img-resize"
                          href={itemChild.Url}
                          title={itemChild.Title}
                          data-id="value-newsid"
                          data-newstype="data-newstype"
                        >
                          <img
                            data-type="avatar"
                            src={
                              config.domainImgNew +
                                "/zoom/456_285/" +
                                itemChild.Avatar.replace(
                                  "https://cdn.tuoitre.vn",
                                  ""
                                ) ||
                              itemChild.Avatar2.replace(
                                "https://cdn.tuoitre.vn",
                                ""
                              )
                            }
                            className="box-category-avatar lazy"
                            alt={itemChild.Title}
                          />
                        </a>
                        <div className="box-category-content">
                          <div className="box-content-title">
                            <h3 className="box-title-text">
                              <a
                                data-type="title"
                                data-linktype="newsdetail"
                                data-id="data-news-id"
                                className="box-category-link-title"
                                data-newstype="value-news-type"
                                href={itemChild.Url}
                                title={itemChild.Title}
                              >
                                {itemChild.Title}
                              </a>
                            </h3>
                          </div>
                          <a
                            className="box-category-category"
                            href="value-zone-url"
                            title="value-zone-alt"
                          >
                            Lorem Ipsum
                          </a>
                          <span className="box-category-time time-ago">
                            12:12
                          </span>
                          <p
                            data-type="sapo"
                            className="box-category-sapo"
                            data-trimline="4"
                          >
                            Đảng Cộng hoà
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default VideoSection;
