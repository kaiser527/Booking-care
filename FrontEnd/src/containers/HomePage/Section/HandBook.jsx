import React from "react";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

const HandBook = (props) => {
  return (
    <div className="section-handbook section-share">
      <div className="section-container">
        <div className="section-header">
          <span className="title-section">Cẩm nang</span>
          <button className="btn-section">Xem thêm</button>
        </div>
        <div className="section-body">
          <Slider {...props.settings}>
            <div className="section-customize">
              <div className="bg-image section-handbook"></div>
              <div>Cơ xương khớp 1</div>
            </div>
            <div className="section-customize">
              <div className="bg-image section-handbook"></div>
              <div>Cơ xương khớp 2</div>
            </div>
            <div className="section-customize">
              <div className="bg-image section-handbook"></div>
              <div>Cơ xương khớp 3</div>
            </div>
            <div className="section-customize">
              <div className="bg-image section-handbook"></div>
              <div>Cơ xương khớp 4</div>
            </div>
            <div className="section-customize">
              <div className="bg-image section-handbook"></div>
              <div>Cơ xương khớp 5</div>
            </div>
            <div className="section-customize">
              <div className="bg-image section-handbook"></div>
              <div>Cơ xương khớp 6</div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HandBook;
