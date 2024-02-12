import Model from "@/lib/Model.model";

export class ComplexPlanAndServiceModel extends Model {
  VAR_ID_RESIDENTIAL_PLAN_SERVICES = "id_residential_plan_services";
  VAR_ID_RESIDENTIAL_COMPLEX = "id_residential_complex";
  VAR_ID_PLAN_AND_SERVICE = "id_plan_and_service";
  VAR_ID_STATUS_RESIDENTIAL_PLAN_AND_SERVICE =
    "id_status_residential_plan_and_service";
  VAR_ID_FACTURATION_PERIOD = "id_facturation_period";
  VAR_BILLING_PRICE = "billing_price";
  VAR_ID_CURRENCY = "id_currency";
  VAR_START_DATE = "start_date";
  VAR_END_DATE = "end_date";

  id_residential_plan_services;
  id_residential_complex;
  id_plan_and_service;
  id_status_residential_plan_and_service;
  id_facturation_period;
  billing_price;
  id_currency;
  start_date;
  end_date;

  constructor(complex_plan_service) {
    super(complex_plan_service);
    this.id_residential_plan_services =
      complex_plan_service?.id_residential_plan_services;
    this.id_residential_complex = complex_plan_service?.id_residential_complex;
    this.id_plan_and_service = complex_plan_service?.id_plan_and_service;
    this.id_status_residential_plan_and_service =
      complex_plan_service?.id_status_residential_plan_and_service;
    this.id_facturation_period = complex_plan_service?.id_facturation_period;
    this.billing_price = complex_plan_service?.billing_price;
    this.id_currency = complex_plan_service?.id_currency;
    this.start_date = complex_plan_service?.start_date;
    this.end_date = complex_plan_service?.end_date;
  }

  get getAll() {
    return {
      id_residential_plan_services: this?.id_residential_plan_services,
      id_residential_complex: this?.id_residential_complex,
      id_plan_and_service: this?.id_plan_and_service,
      id_status_residential_plan_and_service:
        this?.id_status_residential_plan_and_service,
      id_facturation_period: this?.id_facturation_period,
      billing_price: this?.billing_price,
      id_currency: this?.id_currency,
      start_date: this?.start_date,
      end_date: this?.end_date,
    };
  }
};
