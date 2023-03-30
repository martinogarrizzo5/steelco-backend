import React from "react";
import { BsCalendar3 } from "react-icons/bs";
import useComponentVisible from "../hooks/useComponentVisible";
import { Calendar } from "react-date-range";

interface DatePickerProps {
  date?: Date;
  onChange: (value: Date) => void;
}

function DatePicker(props: DatePickerProps) {
  const {
    ref: calendarRef,
    isComponentVisible: isCalendarShown,
    setIsComponentVisible: setCalendarShown,
  } = useComponentVisible(false);

  return (
    <div ref={calendarRef} className="relative">
      <div
        className="input p-3 pr-4 cursor-pointer flex justify-between"
        onClick={() => setCalendarShown((prevVal) => !prevVal)}
      >
        {props.date ? (
          <span>
            {props.date.toLocaleDateString("it-IT", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        ) : (
          <span className="text-subTitle">Seleziona una data</span>
        )}
        <BsCalendar3 className="text-xl text-primary" />
      </div>
      {isCalendarShown && (
        <Calendar
          className="absolute xs:right-0 right-[-0.5rem] bottom-0 z-30 translate-y-[102%] shadow-lg"
          onChange={(date) => {
            setCalendarShown(false);
            props.onChange(date);
          }}
          date={props.date}
          color="var(--primaryColor)"
        />
      )}
    </div>
  );
}

export default DatePicker;
