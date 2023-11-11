import { FC, useEffect, useState } from "react";
import { Button, Card, Col, Flex, Row, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks";
import { IGroup } from "../../models/group";
import Title from "antd/es/typography/Title";
import { List } from "../../components";
import { useTranslation } from "react-i18next";

interface IProps {}

const getDate = (date: any) => new Date(date).toLocaleDateString(
  "en-US",
  { year: "numeric", month: "2-digit", day: "numeric" },
);

export const Request: FC<IProps> = (): JSX.Element => {
  const { requestId } = useParams();
  const api = useApi();
  const { t } = useTranslation();
  const [ requestData, setRequestData ] = useState<IGroup>();

  const tableLabels = {
    name: t("tableLabels.name"),
    customersCount: t("tableLabels.customersCount"),
    description: t("tableLabels.description"),
    customerTraffics: t("tableLabels.customerTraffics"),
    conversationStates: t("tableLabels.conversationStates"),
    maxChildAge: t("tableLabels.maxChildAge"),
    minChildAge: t("tableLabels.minChildAge"),
    maxChildCount: t("tableLabels.maxChildCount"),
    minChildCount: t("tableLabels.minChildCount"),
    recommendationDays: t("tableLabels.recommendationDays"),
    recommendationFrequencies: t("tableLabels.recommendationFrequencies"),
    updatedAt: t("tableLabels.updatedAt"),
    createdAt: t("tableLabels.createdAt"),
  };

  useEffect(() => {
    if (requestId) {
      api.groups.one({ id: requestId }).then((category) => setRequestData(category.items[0]));
    }
  }, [ requestId ]);

  const handleDownload = () => {
    if (requestId) {
      api.groups.download({ id: requestId }).then((res) => console.log(res));
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id - b.id,
      key: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      sorter: true,
      editable: true,
      key: "name",
    },
    {
      title: "address",
      dataIndex: "address",
      sorter: true,
      editable: true,
      key: "address",
    },
    {
      title: "comment",
      dataIndex: "comment",
      sorter: true,
      editable: true,
      key: "comment",
    },

  ];

  return (
    <Flex vertical>
      <Row gutter={[ 24, 24 ]} justify={"center"}>
        <Col>
          <Skeleton loading={!requestData} active={true}>
            <Flex justify="space-between" align="center">
              <Title>{requestData?.name}</Title>
            </Flex>

          </Skeleton>

          <Flex vertical gap={"middle"}>
            <Skeleton loading={!requestData} active={true}>
              <Card title={tableLabels.customersCount}>
                <Title level={2}>{requestData?.customersCount}</Title>
              </Card>
            </Skeleton>
            <Skeleton loading={!requestData} active={true}>
              <Card title={tableLabels.createdAt}>
                <Title level={2}>{getDate(requestData?.createdAt)}</Title>
              </Card>
            </Skeleton>
            <Skeleton loading={!requestData} active={true}>
              {requestData?.updatedAt &&
                <Card title={tableLabels.updatedAt}>
                  <Title level={2}>{getDate(requestData?.updatedAt)}</Title>
                </Card>}
            </Skeleton>
            <Skeleton loading={!requestData} active={true}>
              <Button onClick={handleDownload}>Download PDF</Button>
            </Skeleton>
          </Flex>
        </Col>
      </Row>
      <Flex justify={"center"} vertical>
        <Title level={3} style={{ margin: 0 }}>Requests</Title>
        <List
          resource="requestData"
          apiConfig={{ id: requestId }}
          config={columns}
        />
      </Flex>
    </Flex>
  );
};