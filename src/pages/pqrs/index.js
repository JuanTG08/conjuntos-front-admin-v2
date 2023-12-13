import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import {
  CONST_PQRS_PRIORITY,
  CONST_PQRS_STATUS,
} from "@/constants/pqrs.constant";
import { PQRSController } from "@/controller/pqrs.controller";
import { PQRSUtils } from "@/utils/pqrs.utils";
import { TokenUtils } from "@/utils/token.utils";
import { Badge, Select, Table, Typography } from "antd";
const { Title } = Typography;
import Link from "next/link";
import React, { useState } from "react";

const columns = [
  {
    title: "Número",
    dataIndex: "tracking_number",
    rowScope: "row",
  },
  {
    title: "Tipo",
    dataIndex: "pqrs_types_request",
    responsive: ["md"],
  },
  {
    title: "Categoría",
    dataIndex: "pqrs_category_request",
    responsive: ["md"],
  },
  {
    title: "Titulo",
    dataIndex: "title",
  },
];

const ViewListPQRSToAdmin = ({ listPending, listResolved }) => {
  const [pqrs, setPqrs] = useState(listPending);

  const [statusPQRSFilter, setStatusPQRSFilter] = useState(
    CONST_PQRS_STATUS.PENDING.id
  );
  const [priorityPQRSFilter, setPriorityFilter] = useState();

  const onChangeStatusPQRS = (value) => {
    if (value === CONST_PQRS_STATUS.PENDING.id) {
      setPqrs(listPending);
      setStatusPQRSFilter(value);
    } else if (value === CONST_PQRS_STATUS.RESOLVED.id) {
      setPqrs(listResolved);
      setStatusPQRSFilter(value);
    }
  };

  const onChangePriorityPQRS = (value) => {
    if (value === CONST_PQRS_PRIORITY.LOW.id) {
      setPqrs(
        listPending.filter(
          (pqr) =>
            pqr.pqrs_priority.id_pqrs_priority === CONST_PQRS_PRIORITY.LOW.id
        )
      );
      setPriorityFilter(value);
    } else if (value === CONST_PQRS_PRIORITY.MEDIUM.id) {
      setPqrs(
        listPending.filter(
          (pqr) =>
            pqr.pqrs_priority.id_pqrs_priority === CONST_PQRS_PRIORITY.MEDIUM.id
        )
      );
      setPriorityFilter(value);
    } else if (value === CONST_PQRS_PRIORITY.HIGH.id) {
      setPqrs(
        listPending.filter(
          (pqr) =>
            pqr.pqrs_priority.id_pqrs_priority === CONST_PQRS_PRIORITY.HIGH.id
        )
      );
      setPriorityFilter(value);
    } else {
      onChangeStatusPQRS(statusPQRSFilter);
      setPriorityFilter(value);
    }
  };

  const getDataTable = () => {
    const dataTable = pqrs.map((pqr) => {
      return {
        key: pqr.id_pqrs,
        tracking_number: (
          <Badge
            color={PQRSUtils.getColorBadgePriority(
              pqr.pqrs_priority.id_pqrs_priority
            )}
            text={
              <Link
                href={`/pqrs/thread/${pqr.id_pqrs}/reply`}
              >
                {pqr.tracking_number} ({pqr.pqrs_priority.name})
              </Link>
            }
          />
        ),
        pqrs_types_request: pqr.pqrs_types_request.name,
        pqrs_category_request: pqr.pqrs_category_request.name,
        title: (
          <Badge
            color={PQRSUtils.getColorBadgeStatus(pqr.id_status)}
            text={
              <Link href={`/pqrs/thread/${pqr.id_pqrs}/reply`}>
                {pqr.title}
              </Link>
            }
          />
        ),
      };
    });
    return dataTable;
  };
  const DataTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={getDataTable()}
        bordered
        size="large"
        title={() => (
          <>
            <Title level={3} style={{ marginBottom: 0, textAlign: "center" }}>
              PQRS ({PQRSUtils.getNamePluralStatus(statusPQRSFilter)})
            </Title>
            <div className="w-full my-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              <Select
                style={{ width: "100%" }}
                value={statusPQRSFilter}
                onChange={onChangeStatusPQRS}
                options={[
                  {
                    value: CONST_PQRS_STATUS.PENDING.id,
                    label: (
                      <Badge
                        color={PQRSUtils.getColorBadgeStatus(
                          CONST_PQRS_STATUS.PENDING.id
                        )}
                        text={CONST_PQRS_STATUS.PENDING.name}
                      />
                    ),
                  },
                  {
                    value: CONST_PQRS_STATUS.RESOLVED.id,
                    label: (
                      <Badge
                        color={PQRSUtils.getColorBadgeStatus(
                          CONST_PQRS_STATUS.RESOLVED.id
                        )}
                        text={CONST_PQRS_STATUS.RESOLVED.name}
                      />
                    ),
                  },
                ]}
                size="large"
              />
              <Select
                style={{ width: "100%" }}
                value={priorityPQRSFilter}
                placeholder="Prioridad"
                onChange={onChangePriorityPQRS}
                allowClear
                options={[
                  {
                    value: CONST_PQRS_PRIORITY.LOW.id,
                    label: (
                      <Badge
                        color={PQRSUtils.getColorBadgePriority(
                          CONST_PQRS_PRIORITY.LOW.id
                        )}
                        text={CONST_PQRS_PRIORITY.LOW.name}
                      />
                    ),
                  },
                  {
                    value: CONST_PQRS_PRIORITY.MEDIUM.id,
                    label: (
                      <Badge
                        color={PQRSUtils.getColorBadgePriority(
                          CONST_PQRS_PRIORITY.MEDIUM.id
                        )}
                        text={CONST_PQRS_PRIORITY.MEDIUM.name}
                      />
                    ),
                  },
                  {
                    value: CONST_PQRS_PRIORITY.HIGH.id,
                    label: (
                      <Badge
                        color={PQRSUtils.getColorBadgePriority(
                          CONST_PQRS_PRIORITY.HIGH.id
                        )}
                        text={CONST_PQRS_PRIORITY.HIGH.name}
                      />
                    ),
                  },
                ]}
                size="large"
              />
            </div>
          </>
        )}
      />
    );
  };
  return (
    <>
      <HeaderPage title="PQRS" />
      <TitlePage level={1}>PQRS</TitlePage>
      <div className="w-full overflow-x-auto">
        <DataTable />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos los datos necesarios para el formulario
    const getData = await PQRSController.apiSSRGetListPQRSToAdmin(getCookies);
    if (getData.error || getData.statusCode != 200 || !getData.payload)
      throw new Error("No fue posible obtener los datos");
    return {
      props: {
        ...getData.payload,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/pqrs/info",
        permanent: false,
      },
    };
  }
}

export default ViewListPQRSToAdmin;
