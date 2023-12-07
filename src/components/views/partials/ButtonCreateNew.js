import React from "react";
import { Button, Spacer } from "@nextui-org/react";
import Link from "next/link";
import { AddNoteBulkIcon } from "@nextui-org/shared-icons";
const ButtonCreateNew = ({
  href,
  value,
  color = "primary",
  variant = "solid",
  size = "lg",
  radius = "sm",
  fullWidth = true,
  spaceY = 2,
  ...props
}) => {
  return (
    <>
      <Spacer y={spaceY} />
      <Button
        as={Link}
        type="button"
        href={href}
        color={color}
        variant={variant}
        size={size}
        radius={radius}
        fullWidth={fullWidth}
        startContent={<AddNoteBulkIcon className="text-3xl" />}
        {...props}
      >
        {value}
      </Button>
      <Spacer y={spaceY} />
    </>
  );
};

export default ButtonCreateNew;
