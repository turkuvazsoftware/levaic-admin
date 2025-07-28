import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";

registerLocale('tr', tr);

const DateTimePicker = ({ date, setDate }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        Tarih ve Saat <span style={{ color: 'red' }}>*</span>
      </Form.Label>
      <br />
      <DatePicker
        className="form-control"
        wrapperClassName="w-100"
        selected={date}
        onChange={setDate}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd.MM.yyyy HH:mm"
        locale="tr"
        placeholderText="Tarih ve saat seçin"
      />
    </Form.Group>
  );
};

export default DateTimePicker;  