import { Button, Spacer } from "@nextui-org/react";
import React from "react";

const ButtonFormSubmit = ({
  value,
  color = "primary",
  variant = "solid",
  size = "lg",
  radius = "sm",
  fullWidth = true,
  spaceY = 2,
  endContent = null,
  ...props
}) => {
  return (
    <>
      <Spacer y={spaceY} />
      <Button
        type="submit"
        color={color}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        radius={radius}
        endContent={endContent}
        {...props}
      >
        {value}
      </Button>
      <Spacer y={spaceY} />
    </>
  );
};

export default ButtonFormSubmit;
