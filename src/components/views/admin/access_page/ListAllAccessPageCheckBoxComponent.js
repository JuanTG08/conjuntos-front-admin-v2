import { Descriptions, Popconfirm } from "antd";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
} from "@nextui-org/react";

import { columns, statusOptions } from "./ListAllAccessPageCheckBoxData";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { ChevronDownIcon } from "@/components/Icons/ChevronDownIcon";
import { MoreOutlined } from "@ant-design/icons";
import { DeleteIcon } from "@/components/Icons/DeleteIcon";
import { EditIcon } from "@/components/Icons/EditIcon";
import { EyeIcon } from "@/components/Icons/EyeIcon";

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const statusColorMap = {
  Activo: "success",
  Inactivo: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["path", "name", "actions"];

const ListAllAccessPageCheckBoxComponent = ({
  from_to,
  deleteAccessPage,
  onSubmit,
}) => {
  const [access_pages, setAccess_pages] = useState([]);
  useEffect(() => {
    const accessPages = from_to?.access_page;
    if (!accessPages) return;
    setAccess_pages(
      accessPages.map((access_page, index) => ({
        id: access_page.id,
        path: access_page.path,
        method: access_page.path_methods.name,
        name: access_page.name,
        description: access_page.description,
        status: access_page.status_access_page_statusTostatus.name,
      }))
    );
    setSelectedKeys(
      new Set(
        accessPages
          .map((access_page) =>
            access_page.checked ? access_page.id.toString() : null
          )
          .filter((access_pages) => access_pages)
      )
    );
  }, [from_to]);

  const onChangeCheckBox = (e, index) => {
    const check = e.target.checked;
    setAccess_pages((prevData) => {
      const newData = [...prevData];
      newData[index].checked = check;
      return newData;
    });
  };
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "path",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const pages = Math.ceil(access_pages.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredAccessPages = [...access_pages];

    if (hasSearchFilter) {
      filteredAccessPages = filteredAccessPages.filter((access_page) =>
        access_page.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredAccessPages = filteredAccessPages.filter((access_page) =>
        Array.from(statusFilter).includes(access_page.status)
      );
    }

    return filteredAccessPages;
  }, [access_pages, filterValue, statusFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((access_page, columnKey) => {
    const cellValue = access_page[columnKey];

    switch (columnKey) {
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[access_page.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Visitar la página">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Link href={access_page.path} target="_blank">
                  <EyeIcon />
                </Link>
              </span>
            </Tooltip>
            <Tooltip content="Editar página">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Link
                  href={"/admin/access_page/AccessPageEdit/" + access_page.id}
                >
                  <EditIcon />
                </Link>
              </span>
            </Tooltip>
            <Popconfirm
              title="Eliminar"
              description={`¿Deseas eliminar esta ruta "${access_page.name}"?`}
              onConfirm={() => deleteAccessPage(access_page)}
              okButtonProps={{
                className: "bg-danger",
              }}
            >
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Popconfirm>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Buscar nombre"
            size="md"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="md"
                  variant="flat"
                >
                  Estados
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="md"
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              as={Link}
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="md"
              href="/admin/access_page/AccessPageCreate"
            >
              Crear
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {access_pages.length} páginas de acceso
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    access_pages.length,
    hasSearchFilter,
  ]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);
  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  const getDataDescription = () => {
    return [
      {
        key: "1",
        label: "Rutas establecidas",
        children: access_pages?.filter((acc_p) => acc_p.checked).length,
      },
      {
        key: "2",
        label: "Rutas Totales",
        children: access_pages?.length,
      },
    ];
  };

  return (
    <>
      <Button
        as="button"
        className="bg-foreground text-background my-2"
        size="md"
        onClick={() => onSubmit(selectedKeys, from_to?.id_from_to)}
      >
        Guardar rutas establecidas
      </Button>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns} style={{ maxWidth: "100%" }}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No se encontró ninguna página de acceso"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ListAllAccessPageCheckBoxComponent;
