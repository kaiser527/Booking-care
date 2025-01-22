import { useSelector } from "react-redux";
import "./DetailDoctorHeader.scss";
import { LANGUAGES } from "../../../utils";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const DetailDoctorHeader = () => {
  const history = useHistory();

  const detailDoctor = useSelector((state) => state.doctor.detailDoctor);
  const language = useSelector((state) => state.app.language);

  return (
    <div className="detail-doctor-header-container">
      <div className="detail-doctor-header-content">
        <div className="left-content">
          <span onClick={() => history.push("/home")}>
            <i className="fa fa-arrow-left"></i>
          </span>
          {detailDoctor && detailDoctor.positionData && (
            <>
              {language === LANGUAGES.VI
                ? `${detailDoctor.positionData.valueVi}, ${detailDoctor.fullName}`
                : `${detailDoctor.positionData.valueEn}, ${detailDoctor.fullName}`}
            </>
          )}
        </div>
        <div className="right-content">
          <div className="support">
            <i className="fas fa-question-circle"></i>
            <span>
              <FormattedMessage id="patient.detail-doctor.header.support" />
            </span>
          </div>
          <span className="icon">
            <i className="fas fa-bars"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailDoctorHeader;
