import { useSelector } from "react-redux";
import "./SectionHeader.scss";
import { LANGUAGES, path } from "../../utils";
import { useHistory, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const SectionHeader = () => {
  const history = useHistory();

  const location = useLocation();

  const detailDoctor = useSelector((state) => state.doctor.detailDoctor);
  const language = useSelector((state) => state.app.language);

  return (
    <div className="section-header-container">
      <div className="section-header-content">
        <div className="left-content">
          <span onClick={() => history.push("/home")}>
            <i className="fa fa-arrow-left"></i>
          </span>
          {location.pathname.slice(1, 14) ===
            path.DETAIL_DOCTOR.slice(1, 14) && (
            <>
              {detailDoctor && detailDoctor.positionData && (
                <>
                  {language === LANGUAGES.VI
                    ? `${detailDoctor.positionData.valueVi}, ${detailDoctor.fullName}`
                    : `${detailDoctor.positionData.valueEn}, ${detailDoctor.fullName}`}
                </>
              )}
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

export default SectionHeader;
