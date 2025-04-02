import { useEffect, useState } from "react";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManagePatient.scss";
import { injectIntl } from "react-intl";
import * as actions from "../../../store/actions";
import { Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { dateFormat, LANGUAGES } from "../../../utils";
import ReactPaginate from "react-paginate";

const ManagePatient = (props) => {
  const currentLimit = 5;

  const [totalPages, setTotalPages] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);

  const language = useSelector((state) => state.app.language);
  const patientData = useSelector((state) => state.doctor.patientData);
  const userInfo = useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();

  console.log(patientData.patients);

  const date = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

  useEffect(() => {
    dispatch(
      actions.getListPatientForDoctorRedux(
        currentPage,
        currentLimit,
        userInfo.id,
        `${date} 07:00:00`
      )
    );
  }, [date, currentPage]);

  useEffect(() => {
    setTotalPages(patientData.totalPages);
  }, [patientData]);

  const handleOnChangeDatePicker = (date) => {
    setCurrentDate(date[0]);
  };

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleBtnConfirm = () => {};

  const handleBtnRemedy = () => {};

  return (
    <div className="manage-patient-container">
      <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
      <div className="m-p-body row">
        <div className="col-4 form-group">
          <label>Chọn ngày khám</label>
          <DatePicker
            className="form-control"
            onChange={handleOnChangeDatePicker}
            value={currentDate}
            placeholder={props.intl.formatMessage({
              id: "manage-schedule.placeholder",
            })}
          />
        </div>
        <div className="col-12">
          <Table bordered hover responsive striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Schedule</th>
                <th>Fullname</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientData.patients && patientData.patients.length > 0 ? (
                patientData.patients.map((item, index) => {
                  return (
                    <tr key={`patient-${index}`}>
                      <th>{index + 1}</th>
                      <th>
                        {language === LANGUAGES.VI
                          ? item.timeData.valueVi
                          : item.timeData.valueEn}
                      </th>
                      <td>{item.userData.fullName}</td>
                      <td>{item.userData.gender}</td>
                      <td>
                        <button
                          className="mp-btn-confirm"
                          onClick={() => handleBtnConfirm()}
                        >
                          Confirm
                        </button>
                        <button
                          className="mp-btn-remedy"
                          onClick={() => handleBtnRemedy()}
                        >
                          Send remedy
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5}>no data</td>
                </tr>
              )}
            </tbody>
          </Table>
          {totalPages > 0 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< Prev"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ManagePatient);
