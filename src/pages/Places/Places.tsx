import { FC, useEffect, useState } from "react";
import { Button, Flex, Table } from "antd";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { SearchBar } from "../../components";
import { useTranslation } from "react-i18next";
import { gql, useLazyQuery } from "@apollo/client";

const PLACES = gql`
  query nodesAll($search: String!, $pageSize: Int, $offset: String ) {
  pagedNodes(
    after: $offset
    first: $pageSize
    where: {
      tags: {
        any: true
      }
       or: [
        {
          tags: {
            some: { name: { eq: "name" }, value: { contains: $search } }
          }
        }
         {
          tags: {
            some: { name: { eq: "name:uk" }, value: { contains: $search } }
          }
        }
        {
          tags: {
            some: { name: { eq: "name:en" }, value: { contains: $search } }
          }
        }
      ]
    }
  ) {
    pageInfo {
      hasNextPage
      endCursor
      hasPreviousPage
      startCursor
    }
    totalCount
    nodes {
      id
       tags {
        name
        value
      }
    }
  }
}
`;

interface IProps {}

export const Places: FC<IProps> = (): JSX.Element => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [ total, setTotal ] = useState<number>();
  const [ search, setSearch ] = useState<string>("");
  const [ executeSearch, { data, loading } ] = useLazyQuery(PLACES);
  const [ params, setParams ] = useState<any>({
    pagination: {
      pageSize: 10,
      offset: null,
    },
  });

  useEffect(() => {
    const variables = {
      search,
      pageSize: params.pagination.pageSize,
      offset: params.pagination.offset,
    };

    executeSearch({ variables }).then((res) => {
      setTotal(res.data.pagedNodes.totalCount);
    });
  }, [ params, search ]);

  const handleSearch = (v: string) => {
    setSearch(v);
    setParams({ ...params, pagination: { pageSize: 10 } });
  };

  const onPaginationChange = (page: number, pageSize: number): void => {
    setParams({ ...params, pagination: { pageSize } });
  };

  const config: any = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id - b.id,
      key: "id",
    },
    {
      title: "nameUk",
      dataIndex: "tags",
      key: "nameUk",
      render: (record: any) => <span>{record.find((rec) => rec.name === "name:uk").value}</span>,
    },
    {
      title: t("users.actions"),
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "100px",
      align: "center",
      render: (record: any) => <Button onClick={() => navigate("/place/" + record.id)}>{t("users.view")}</Button>,
    },
  ];

  return (
    <Flex gap="small" vertical>
      <Title level={3}>{t("groups.title")}</Title>
      <SearchBar onSearch={handleSearch} placeholder="Search by name" />
      <Table
        loading={loading}
        columns={config}
        pagination={{ ...params.pagination, total, onChange: onPaginationChange }}
        dataSource={data?.pagedNodes?.nodes}
        scroll={{ x: 1200 }}
      />
    </Flex>
  );
};