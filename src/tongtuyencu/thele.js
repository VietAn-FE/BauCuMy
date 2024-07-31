import React, { useEffect } from "react";

function TheLeBCSB(props) {
  const config = window.config;

  function electionRegulations() {
    document
      .querySelectorAll(".section__regula-view .box-election .item-show .title")
      .forEach(function (title) {
        title.addEventListener("click", function (e) {
          e.preventDefault();

          const itemShow = title.closest(".item-show");
          if (itemShow) {
            itemShow.classList.toggle("show");
          }
        });
      });
  }

  useEffect(() => {
    electionRegulations();
  }, []);

  return (
    <div className="box-election">
      <h3 className="title">Thể lệ bầu cử</h3>

      <div className="list-show">
        <div className="item-show">
          <a href="" className="title">
            Ai được quyền tranh cử tổng thống Mỹ ?
            <span className="icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5263 10.8384L13.9997 15.365L9.473 10.8384C9.36498 10.7304 9.23675 10.6447 9.09563 10.5862C8.9545 10.5278 8.80325 10.4977 8.6505 10.4977C8.49774 10.4977 8.34649 10.5278 8.20536 10.5862C8.06424 10.6447 7.93601 10.7304 7.828 10.8384C7.71998 10.9464 7.6343 11.0746 7.57585 11.2157C7.51739 11.3569 7.4873 11.5081 7.4873 11.6609C7.4873 11.8136 7.51739 11.9649 7.57585 12.106C7.6343 12.2471 7.71998 12.3754 7.828 12.4834L13.183 17.8384C13.638 18.2934 14.373 18.2934 14.828 17.8384L20.183 12.4834C20.2911 12.3754 20.377 12.2472 20.4355 12.1061C20.494 11.965 20.5242 11.8137 20.5242 11.6609C20.5242 11.5081 20.494 11.3568 20.4355 11.2156C20.377 11.0745 20.2911 10.9463 20.183 10.8384C19.728 10.395 18.9813 10.3834 18.5263 10.8384Z"
                  fill="#666666"
                />
              </svg>
            </span>
          </a>

          <div className="content-collapse">
            <p className="des">
              Theo hiến pháp Mỹ quy định tổng thống Mỹ phải là người sinh ra tại
              Mỹ, ít nhất 35 tuổi và đã cư trú liên tục trong nước ít nhất 14
              năm. Ứng viên tổng thống thường đến từ hai chính đảng gồm đảng
              Cộng hòa và đảng Dân chủ. Ngoài ra, còn có ứng viên đảng khác hoặc
              ứng viên độc lập.
            </p>
          </div>
        </div>

        <div className="item-show">
          <a href="" className="title">
            Khi nào bầu cử Mỹ diễn ra?
            <span className="icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5263 10.8384L13.9997 15.365L9.473 10.8384C9.36498 10.7304 9.23675 10.6447 9.09563 10.5862C8.9545 10.5278 8.80325 10.4977 8.6505 10.4977C8.49774 10.4977 8.34649 10.5278 8.20536 10.5862C8.06424 10.6447 7.93601 10.7304 7.828 10.8384C7.71998 10.9464 7.6343 11.0746 7.57585 11.2157C7.51739 11.3569 7.4873 11.5081 7.4873 11.6609C7.4873 11.8136 7.51739 11.9649 7.57585 12.106C7.6343 12.2471 7.71998 12.3754 7.828 12.4834L13.183 17.8384C13.638 18.2934 14.373 18.2934 14.828 17.8384L20.183 12.4834C20.2911 12.3754 20.377 12.2472 20.4355 12.1061C20.494 11.965 20.5242 11.8137 20.5242 11.6609C20.5242 11.5081 20.494 11.3568 20.4355 11.2156C20.377 11.0745 20.2911 10.9463 20.183 10.8384C19.728 10.395 18.9813 10.3834 18.5263 10.8384Z"
                  fill="#666666"
                />
              </svg>
            </span>
          </a>

          <div className="content-collapse">
            <p className="des">
              Bầu cử tổng thống Mỹ thường niên diễn ra 4 năm một lần, vào năm
              chẵn, trong ngày thứ ba sau thứ hai đầu tiên của tháng 11. Ví dụ,
              nếu ngày thứ Hai đầu tiên của tháng 11 là ngày 1, thì bầu cử tổng
              thống sẽ diễn ra vào ngày 2 tháng 11.
            </p>
          </div>
        </div>

        <div className="item-show">
          <a href="" className="title">
            Quy trình bầu cử Mỹ diễn ra như thế nào?
            <span className="icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5263 10.8384L13.9997 15.365L9.473 10.8384C9.36498 10.7304 9.23675 10.6447 9.09563 10.5862C8.9545 10.5278 8.80325 10.4977 8.6505 10.4977C8.49774 10.4977 8.34649 10.5278 8.20536 10.5862C8.06424 10.6447 7.93601 10.7304 7.828 10.8384C7.71998 10.9464 7.6343 11.0746 7.57585 11.2157C7.51739 11.3569 7.4873 11.5081 7.4873 11.6609C7.4873 11.8136 7.51739 11.9649 7.57585 12.106C7.6343 12.2471 7.71998 12.3754 7.828 12.4834L13.183 17.8384C13.638 18.2934 14.373 18.2934 14.828 17.8384L20.183 12.4834C20.2911 12.3754 20.377 12.2472 20.4355 12.1061C20.494 11.965 20.5242 11.8137 20.5242 11.6609C20.5242 11.5081 20.494 11.3568 20.4355 11.2156C20.377 11.0745 20.2911 10.9463 20.183 10.8384C19.728 10.395 18.9813 10.3834 18.5263 10.8384Z"
                  fill="#666666"
                />
              </svg>
            </span>
          </a>

          <div className="content-collapse">
            <p className="des">
              <span className="bold">1. Các ứng viên tranh cử</span>
              Trước hết, các ứng viên từ các đảng chính thống (như Đảng Dân chủ
              và Đảng Cộng hòa) hoặc là ứng viên độc lập quyết định tranh cử
              tổng thống.
            </p>

            <p className="des">
              <span className="bold">2. Bầu cử sơ bộ trong các bang</span>
              Các ứng viên thuộc cùng một đảng cạnh tranh nội bộ để trở thành
              ứng viên đại diện cho đảng. Nếu không giành được sự quan tâm của
              cử tri, ứng viên tự động rút lui. Ứng viên đại diện từng đảng được
              thông báo chính thức vào mùa hè, tại các đại hội đảng. Họ chọn ứng
              viên phó tổng thống đồng hành với mình
            </p>

            <p className="des">
              <span className="bold">3. Chiến dịch vận động tranh cử</span>
              Ứng viên được chọn sẽ bắt đầu chiến dịch chính thức trên toàn
              quốc, tập trung vào việc thu hút sự ủng hộ từ cử tri thông qua các
              cuộc tranh luận, quảng cáo, diễn đàn công khai, và các sự kiện
              quảng bá khác.
            </p>

            <p className="des">
              <span className="bold">4. Bầu cử tổng thống</span>
              <span className="bold2">Có 2 loại phiếu:</span>
              Phiếu bầu của cử tri phổ thông, phiếu bầu của đại cử tri. Người
              giành được tối thiểu 270 phiếu đại cử tri sẽ thắng cuộc(không quan
              tâm tới số lượng phiếu cư tri phổ thông). Nếu không ai đạt được số
              phiếu tối thiểu thì hạ viện sẽ tiến hành bầu cử chọn ra tổng
              thống. (tùy vào quy định của các bang, đa số các bang tất cả đại
              cử tri phải bỏ phiếu theo kết quả bỏ phiếu của cư tri phổ thông,
              tức là ứng viên nào được đa số phiếu phổ thông thì được toàn bộ
              phiếu của đại cử tri ở bang đó )
              <span className="bold2">Đại cử tri:</span>
              Đại cử tri là người sẽ đại diện cho cử tri phổ thông(người dân) để
              chọn ra tổng thống. Mỗi bang sẽ có số đại cư tri cố định (được
              quyết định trên mật độ dân số của bang đó) tương ứng với số thượng
              nghị sĩ và nghị viên trong quốc hội, các bang tự quyết định và bầu
              ra đại cử tri.
              <span className="bold2">Cử tri phổ thông:</span>
              người dân có đủ quyền tham gia bầu cử theo luật pháp.
            </p>

            <p className="des">
              <span className="bold">5. Lễ nhậm chức</span>
              Tổng thống mới sẽ nhậm chức vào ngày 20 tháng 1 của năm tiếp theo
              sau bầu cử.
            </p>
          </div>
        </div>

        <div className="item-show">
          <a href="" className="title">
            Phiếu bầu tổng thống Mỹ được quy định ra sao?
            <span className="icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5263 10.8384L13.9997 15.365L9.473 10.8384C9.36498 10.7304 9.23675 10.6447 9.09563 10.5862C8.9545 10.5278 8.80325 10.4977 8.6505 10.4977C8.49774 10.4977 8.34649 10.5278 8.20536 10.5862C8.06424 10.6447 7.93601 10.7304 7.828 10.8384C7.71998 10.9464 7.6343 11.0746 7.57585 11.2157C7.51739 11.3569 7.4873 11.5081 7.4873 11.6609C7.4873 11.8136 7.51739 11.9649 7.57585 12.106C7.6343 12.2471 7.71998 12.3754 7.828 12.4834L13.183 17.8384C13.638 18.2934 14.373 18.2934 14.828 17.8384L20.183 12.4834C20.2911 12.3754 20.377 12.2472 20.4355 12.1061C20.494 11.965 20.5242 11.8137 20.5242 11.6609C20.5242 11.5081 20.494 11.3568 20.4355 11.2156C20.377 11.0745 20.2911 10.9463 20.183 10.8384C19.728 10.395 18.9813 10.3834 18.5263 10.8384Z"
                  fill="#666666"
                />
              </svg>
            </span>
          </a>

          <div className="content-collapse">
            <p className="des">
              Ứng viên nhận được nhiều đầu phiếu phổ thông chưa chắc đã trở
              thành tổng thống vì người dân Mỹ không trực tiếp bầu tổng thống,
              thay vào đó là một cử tri đoàn gồm các đại cử tri bỏ phiếu.
            </p>

            <p className="des">
              Có tất cả 538 phiếu đại cử tri. Mỗi bang có một số lượng đại cử
              tri nhất định dựa trên quy mô dân số, tương ứng số đại diện họ có
              trong 435 ghế hạ viện và 100 ghế thượng viện. Ba đại cử tri còn
              lại đến từ thủ đô Washington. Đại cử tri thường bầu theo kết quả
              bỏ phiếu phổ thông của bang mình đại diện. Tuy nhiên, không có quy
              định nào trong hiến pháp hay luật liên bang Mỹ bắt buộc các đại cử
              tri phải làm vậy. Những người không bầu theo kết quả bỏ phiếu phổ
              thông được gọi là “đại cử tri bất tuân”, trường hợp này rất hiếm
              xảy ra. Để chiến thắng, ứng viên cần giành được ít nhất 270 trong
              số 538 ghế đại cử tri.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheLeBCSB;
