import { LogsBookIncidentsCtrl } from "@/controller/logs_book_incidents.controller";
import { ServerSideProps } from "@/lib/ServerSideProps";

export class LogBookServerSideProps extends ServerSideProps {
  VAR_ID_LOG_BOOK = "idLogBook";

  constructor(context) {
    super(context);
  }

  async LogBookListAllMinutas() {
    try {
      const getData = await this.guardFetch(
        LogsBookIncidentsCtrl.apiSSRGetListAllLogsBookIncidents(this.getCookies)
      );
      this.setResponseProps({
        minuta: getData.payload || [],
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }

  async LogBookOne() {
    try {
      const idLogBook = this.getParam(this.VAR_ID_LOG_BOOK);
      const getMinuta = await this.guardFetch(
        LogsBookIncidentsCtrl.apiSSRGetOneLogsBookIncidents(
          idLogBook,
          this._cookies
        )
      );
      this.validateResponseFetch({
        response: getMinuta,
        toRedirect: "/log-book/history",
      });
      this.setResponseProps({
        minuta: getMinuta.payload,
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }

  async LogBookHistory() {
    try {
      const getData = await this.guardFetch(
        LogsBookIncidentsCtrl.apiSSRGetListMyLogsBookIncidents(this.getCookies)
      );
      this.setResponseProps({
        minuta: getData.payload || [],
      });
    } catch (error) {
      console.log("UwU", error);
      this.setRedirect();
    }
  }

  async NewLogIncident() {
    try {
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }
}
