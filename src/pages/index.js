import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  useEffect(() => console.log(session), [session]);
  return <></>;
}

export async function getServerSideProps(context) {
  /*
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
    };*/
  return {
    props: {},
  };
}
