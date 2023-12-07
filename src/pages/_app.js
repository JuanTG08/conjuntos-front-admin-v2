import React, { useState } from "react";
import "@/styles/globals.css";
import { Layout, theme, ConfigProvider } from "antd";
import themeConfig from "@/theme/themeConfig";
import { NextUIProvider } from "@nextui-org/react";
import { MenuNavBarPages } from "@/components/views/partials/navbar";
const { Content, Footer } = Layout;
import esES from "antd/locale/es_ES";
import { UserProvider } from "@/context/UserContext";
import { NavbarUtils } from "@/utils/navbar.utils";
import { SessionProvider, getSession } from "next-auth/react";
import FooterPage from "@/components/views/partials/HomePage/footer";
import { TokenUtils } from "@/utils/token.utils";
// Aqui
const App = ({ Component, pageProps, props }) => {
  const [dataUser, setDataUser] = useState(props);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <SessionProvider session={pageProps?.session}>
      <UserProvider dataUser={dataUser}>
        <NextUIProvider>
          <ConfigProvider theme={themeConfig} locale={esES}>
            <Layout style={{ minHeight: "100vh" }}>
              <MenuNavBarPages
                dataUser={dataUser}
                navBarData={dataUser.navbar}
              />
              <Content
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                <Component {...pageProps} dataUser={props} />
              </Content>
              <Footer>
                <FooterPage
                  navigation={
                    NavbarUtils.getNavbarUser(dataUser.idRole).routesNavbar
                  }
                />
              </Footer>
            </Layout>
          </ConfigProvider>
        </NextUIProvider>
      </UserProvider>
    </SessionProvider>
  );
};

App.getInitialProps = async (appContext) => {
  try {
    const session = await getSession(appContext.ctx);
    const dataUser = {
      empty: true,
      session,
    };
    const getCookies = TokenUtils.destructureAllCookiesClient(appContext.ctx);
    if (getCookies) {
      const { mainRoleToken, userDataToken } = getCookies;
      if (!mainRoleToken || !userDataToken)
        throw new Error("Tokens no validos");
      const { statusCode: statusCodeMainRole, payload: mainRole } =
        await TokenUtils.validTokenJOSE(mainRoleToken);
      const { statusCode: statusCodeUserData, payload: userInformation } =
        await TokenUtils.validTokenJOSE(userDataToken);
      if (statusCodeMainRole != 200 || statusCodeUserData != 200)
        throw new Error("Tokens inválidos");
      dataUser.user = {
        isLogged: true,
        name: userInformation.userData.name,
        lastName: userInformation.userData.last_name,
        mainRole: {
          idRole: mainRole.mainRole.id_roles,
          nameRole: mainRole.mainRole.name,
          mainPage: mainRole.mainRole.access_page.path,
        },
        complex: mainRole.mainRole?.residential_complex,
        tower: mainRole.mainRole?.apartment_complex?.tower_complex,
        apartment: mainRole.mainRole?.apartment_complex,
      };
      dataUser.idRole = mainRole.mainRole.id_roles;
      dataUser.empty = false;
      if (dataUser.user.apartment) delete dataUser.user.apartment.tower_complex;
    }
    return {
      props: dataUser,
    };
  } catch (error) {
    return {
      props: {
        empty: true,
        session: null,
      },
    };
  }
};

export default App;
