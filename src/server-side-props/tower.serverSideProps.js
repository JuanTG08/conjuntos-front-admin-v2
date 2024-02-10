import { TowerController } from "@/controller/tower.controller";
import { ServerSideProps } from "@/lib/ServerSideProps";

export class TowerServerSideProps extends ServerSideProps {
  VAR_ID_COMPLEX = "idComplex";
  VAR_ID_TOWER = "idTower";
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

  async ViewTowerEdit() {
    try {
      const idTower = this.getParam(this.VAR_ID_TOWER);
      const getTower = await this.guardFetch(
        TowerController.apiSSRGetOne(idTower, this.getCookies)
      );
      this.validateResponseFetch({
        response: getTower,
      });
      this.setResponseProps({
        tower: getTower?.payload?.tower_complex,
        complex: getTower?.payload?.residential_complex,
        idTower,
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }
}
