import { TowerController } from "@/controller/tower.controller";
import { ServerSideProps } from "@/lib/ServerSideProps";

export class TowerServerSideProps extends ServerSideProps {
  VAR_ID_COMPLEX = "idComplex";
  constructor(props) {
    super(props);
  }

  async ViewTowerListToComplex() {
    try {
      const idComplex = this.getParam(this.VAR_ID_COMPLEX);
      const getTowers = await this.guardFetch(
        TowerController.apiSSRGetListAll(this.getCookies, idComplex)
      );
      this.setResponseProps({
        idComplex,
        complex: getTowers?.payload?.complex,
        _towers: getTowers?.payload?.towers || [],
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }
}
