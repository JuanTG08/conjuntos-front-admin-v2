import { useEffect, useState } from "react";
const { Button, Form } = require("antd");

export const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);
  return (
    <Button
      type="primary"
      size="large"
      htmlType="submit"
      disabled={!submittable}
    >
      Añadir
    </Button>
  );
};
