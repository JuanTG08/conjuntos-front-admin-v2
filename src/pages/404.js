// pages/404.js
import HeaderPage from "@/components/views/partials/HeaderPage";
import { Button } from "@nextui-org/react";
import { Result } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <HeaderPage title={"404"} />
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, la página que visitaste no existe."
        extra={
          <Button as={Link} size="lg" href="/login" color="primary">
            Volver a la página de inicio
          </Button>
        }
      />
    </>
  );
}
