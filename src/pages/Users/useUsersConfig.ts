import {useTranslation} from "react-i18next";

export const useUsersConfig: any = ({ onView }: any) => {
    const {t} = useTranslation()
  return (
    [
      {
        title: "ID",
        dataIndex: "id",
        sorter: (a: any, b: any) => a.id - b.id,
        key: "id",
      },
      {
        title: "firstName",
        dataIndex: "firstName",
        sorter: true,
        key: "firstName",
      },
      {
        title: "lastName",
        dataIndex: "lastName",
        sorter: true,
        key: "lastName",
      },
      {
        title: "email",
        dataIndex: "email",
        sorter: true,
        key: "email",
      },
      {
        title: t("users.actions"),
        dataIndex: "",
        key: "x",
        fixed: "right",
        width: "100px",
        align: "center",
        render: (record: any) => onView(record),
      },
    ]
  );
};