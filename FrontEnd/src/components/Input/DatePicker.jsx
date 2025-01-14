import React, { useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { KeyCodeUtils } from "../../utils";
import "./DatePicker.scss";

const DatePicker = (props) => {
  const { value, onChange, minDate, onClose, ...otherProps } = props;

  const flatpickrNode = useRef(null);

  const handleKeyDown = (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === KeyCodeUtils.ENTER) {
      event.preventDefault();
      const value = event.target.value;
      const valueMoment = moment(value, "DD/MM/YYYY");
      onChange([valueMoment.toDate(), valueMoment.toDate()]);
    }
  };

  const handleBlur = (event) => {
    const value = event.target.value;
    event.preventDefault();
    const valueMoment = moment(value, "DD/MM/YYYY");
    onChange([valueMoment.toDate(), valueMoment.toDate()]);
  };

  const onOpen = () => {
    if (flatpickrNode.current) {
      flatpickrNode.current.blur();
    }
  };

  useEffect(() => {
    if (flatpickrNode && flatpickrNode.current) {
      flatpickrNode.current?.addEventListener("blur", handleBlur);
      flatpickrNode.current?.addEventListener("keydown", handleKeyDown);
      return () => {
        flatpickrNode.current?.removeEventListener("blur", handleBlur);
        flatpickrNode.current?.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [flatpickrNode]);

  const options = {
    dateFormat: "d/m/Y",
    allowInput: true,
    disableMobile: true,
    onClose: onClose,
    onOpen: onOpen,
    minDate: minDate,
  };

  return (
    <Flatpickr
      ref={(element) => (flatpickrNode.current = element && element.node)}
      value={value}
      onChange={onChange}
      options={options}
      {...otherProps}
    />
  );
};

export default DatePicker;
