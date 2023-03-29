import React from "react";
import { BsCalendar3 } from "react-icons/bs";

interface DatePickerProps {
  date: Date;
  onChange: (value: Date) => void;
}

function DatePicker(props: DatePickerProps) {
  return (
    <div className="input p-3 pr-4 cursor-pointer flex justify-between">
      <span>{props.date.toLocaleDateString()}</span>
      <BsCalendar3 className="text-xl text-primary" />
    </div>
  );
}

export default DatePicker;
