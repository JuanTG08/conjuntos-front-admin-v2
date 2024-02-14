import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

const DateTimePicker = ({ changeFormDatePicker, name }) => {
  const fontSize = "18px";
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        label=" "
        slotProps={{
          textField: {
            variant: "outlined",
            InputLabelProps: { shrink: false, style: { fontSize } },
            InputProps: { style: { fontSize, padding: "2px" } },
            FormHelperTextProps: { style: { fontSize } },
          },
        }}
        name={name}
        className="w-full py-1 h-auto"
        onChange={(value) => changeFormDatePicker(value, name)}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
