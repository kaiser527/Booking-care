import "./DoctorExtraInfor.scss";
import { useState } from "react";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";

const DoctorExtraInfor = (props) => {
  const { detailDoctor, language } = props;

  const [isShowDetailInfor, setIsShowDetailInfor] = useState(false);

  return (
    <div className="doctor-extra-infor-container">
      <div className="content-up">
        <div className="text-address">
          <FormattedMessage id="patient.extra-infor-doctor.text-address" />
        </div>
        <div className="name-clinic">
          {detailDoctor && detailDoctor.infoData
            ? detailDoctor.infoData.nameClinic
            : ""}
        </div>
        <div className="detail-address">
          {detailDoctor && detailDoctor.infoData
            ? detailDoctor.infoData.addressClinic
            : ""}
        </div>
      </div>
      <div className="content-down">
        {!isShowDetailInfor ? (
          <div className="show-price">
            <FormattedMessage id="patient.extra-infor-doctor.price" />:
            {detailDoctor &&
              detailDoctor.infoData &&
              detailDoctor.infoData.priceData && (
                <NumberFormat
                  value={
                    language === LANGUAGES.VI
                      ? detailDoctor.infoData.priceData.valueVi
                      : detailDoctor.infoData.priceData.valueEn
                  }
                  className="currency"
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={language === LANGUAGES.VI ? "đ" : "$"}
                />
              )}
            <span className="detail" onClick={() => setIsShowDetailInfor(true)}>
              <FormattedMessage id="patient.extra-infor-doctor.show" />
            </span>
          </div>
        ) : (
          <>
            <div className="title-price">
              <FormattedMessage id="patient.extra-infor-doctor.price" />:
            </div>
            <div className="detail-infor">
              <div className="price">
                <span className="left">
                  <FormattedMessage id="patient.extra-infor-doctor.price" />
                </span>
                <span className="right">
                  {detailDoctor &&
                    detailDoctor.infoData &&
                    detailDoctor.infoData.priceData && (
                      <NumberFormat
                        value={
                          language === LANGUAGES.VI
                            ? detailDoctor.infoData.priceData.valueVi
                            : detailDoctor.infoData.priceData.valueEn
                        }
                        className="currency"
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={language === LANGUAGES.VI ? "đ" : "$"}
                      />
                    )}
                </span>
              </div>
              <div className="note">
                {detailDoctor && detailDoctor.infoData
                  ? detailDoctor.infoData.note
                  : ""}
              </div>
            </div>
            <div className="payment">
              <FormattedMessage id="patient.extra-infor-doctor.payment" />
              {detailDoctor &&
              detailDoctor.infoData &&
              detailDoctor.infoData.paymentData &&
              language === LANGUAGES.VI
                ? detailDoctor.infoData.paymentData.valueVi
                : detailDoctor.infoData.paymentData.valueEn}
            </div>
            <div className="hide-price">
              <span onClick={() => setIsShowDetailInfor(false)}>
                <FormattedMessage id="patient.extra-infor-doctor.hide" />
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorExtraInfor;
