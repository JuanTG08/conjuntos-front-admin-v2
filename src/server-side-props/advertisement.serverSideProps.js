import { AdvertisementController } from "@/controller/advertisement.controller";
import { AdvertisementTypesByComplexController } from "@/controller/advertisement_types.controller";
import { ComplexController } from "@/controller/complex.controller";
import { StatusController } from "@/controller/status.controller";
import { ServerSideProps } from "@/lib/ServerSideProps";

export class AdvertisementServerSideProps extends ServerSideProps {
  VAR_ID_COMPLEX = "idComplex";
  VAR_ID_ADVERTISEMENT = "idAdvertisement";
  constructor(props) {
    super(props);
  }

  async AdvertisementUpdate() {
    try {
      const idComplex = this.getParam(this.VAR_ID_COMPLEX);
      const idAdvertisement = this.getParam(this.VAR_ID_ADVERTISEMENT);
      const [getComplex, getAdvertisement, getAdvertisementTypes, getStatus] =
        await this.guardFetch(
          ComplexController.apiSSRGetOne(this._cookies, idComplex),
          AdvertisementController.apiSSRGetOneById(
            idAdvertisement,
            this.getCookies
          ),
          AdvertisementTypesByComplexController.apiSSRListWithComplex(
            idComplex,
            this.getCookies
          ),
          StatusController.apiSSRGetStatusSpecific(
            StatusController.apiGetStatusAdvertisement,
            this.getCookies
          )
        );
      this.validateResponseFetch({
        response: getComplex,
      });
      this.validateResponseFetch({
        response: getAdvertisement,
      });
      const { tower_complex, ..._complex } =
        getAdvertisementTypes?.payload?.listComplex;
      const listDataComplex = _complex;
      const listDataTower = tower_complex;
      const listTypes = getAdvertisementTypes?.payload?.listAdvType;
      this.setResponseProps({
        ...this.getParams,
        status: getStatus?.payload || [],
        complex: getComplex?.payload,
        advertisement: getAdvertisement?.payload,
        listDataComplex,
        listDataTower,
        listTypes,
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }
}
