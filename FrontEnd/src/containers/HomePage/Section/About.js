import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-about section-share">
        <div className="section-about-header">
          Truyền thông nói về Kiana Kaslana
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="80%"
              height="400"
              src="https://www.youtube.com/embed/VeWCBissZy8"
              title="Phim ngắn của Honkai Impact 3 - [Hành Trình Tốt Nghiệp]"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <div>
              <p>
                Kiana Kaslana is one of the main protagonists of Honkai Impact
                3rd along with Raiden Mei and Bronya Zaychik. She is the
                adoptive daughter of Siegfried Kaslana, alongside being a vessel
                for the 2nd Herrscher — Herrscher of the Void. After the events
                of Chapter 25, she awakens as the Herrscher of Flamescion.
                Ultimately after the events of Chapter 35, her will was approved
                by the Cocoon of Finality, granting her its power and allowing
                her to awaken as the one and only true Herrscher of the End.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
