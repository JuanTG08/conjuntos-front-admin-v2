import { getSession } from "next-auth/react";

export default function Home() {
  return <></>;
}

export async function getServerSideProps(context) {
  const token = await getSession(context);
  if (token)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  else if (!token)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  return {
    props: {},
  };
}
