import ProfileDoctor from "../ProfileDoctor";
import "./BookingModal.scss";
import { Modal } from "reactstrap";

const BookingModal = (props) => {
  const { setIsShowModalBooking, isShowModalBooking, dataScheduleTimeModal } =
    props;

  return (
    <div>
      <Modal
        centered
        size="lg"
        isOpen={isShowModalBooking}
        className="booking-modal-container"
        backdrop={true}
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">Thông tin đặt lịch khám bệnh</span>
            <span
              className="right"
              onClick={() => setIsShowModalBooking(false)}
            >
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="doctor-infor">
              <ProfileDoctor />
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label>Họ tên</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-6 form-group">
                <label>Số điện thoại</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ Email</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ liên hệ</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-12 form-group">
                <label>Lý do khám</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-6 form-group">
                <label>Dặt cho ai</label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-6 form-group">
                <label>Giới tính</label>
                <input className="form-control" type="text" />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="btn-booking-confirm">Xác nhận</button>
            <button
              className="btn-booking-cancel"
              onClick={() => setIsShowModalBooking(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingModal;
