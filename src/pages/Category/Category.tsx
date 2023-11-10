import { FC, useEffect, useState } from "react";
import { Button, Card, Col, Flex, Row, Skeleton } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../hooks";
import { IGroup } from "../../models/group";
import Title from "antd/es/typography/Title";
import { List } from "../../components";
import { useUsersConfig } from "../Users/useUsersConfig";
import { useTranslation } from "react-i18next";

interface IProps {}

const getDate = (date: any) => new Date(date).toLocaleDateString(
  "en-US",
  { year: "numeric", month: "2-digit", day: "numeric" },
);

export const Category: FC<IProps> = (): JSX.Element => {
  const { categoryId } = useParams();
  const api = useApi();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ categoryData, setCategoryData ] = useState<IGroup>();

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
    if (categoryId) {
      api.groups.one({ id: categoryId }).then((category) => setCategoryData(category.items[0]));
    }
  }, [ categoryId ]);

  const renderView = (record: any) => <Button onClick={() => navigate("/user/" + record.key)}>View</Button>;

  const config = useUsersConfig({ onView: renderView });

  const handleDownload = () => {
    if (categoryId) {
      api.groups.download({ id: categoryId }).then((res) => console.log(res));
    }
  };

  return (
    <Flex vertical>
      <Row gutter={[ 24, 24 ]} justify={"center"}>
        <Col>
          <Skeleton loading={!categoryData} active={true}>
            <Flex justify="space-between" align="center">
              <Title>{categoryData?.name}</Title>
            </Flex>

          </Skeleton>

          <Flex vertical gap={"middle"}>
            <Skeleton loading={!categoryData} active={true}>
              <Card title={tableLabels.customersCount}>
                <Title level={2}>{categoryData?.customersCount}</Title>
              </Card>
            </Skeleton>
            <Skeleton loading={!categoryData} active={true}>
              <Card title={tableLabels.createdAt}>
                <Title level={2}>{getDate(categoryData?.createdAt)}</Title>
              </Card>
            </Skeleton>
            <Skeleton loading={!categoryData} active={true}>
              {categoryData?.updatedAt &&
                <Card title={tableLabels.updatedAt}>
                  <Title level={2}>{getDate(categoryData?.updatedAt)}</Title>
                </Card>}
            </Skeleton>
            <Skeleton loading={!categoryData} active={true}>
              <Button onClick={handleDownload}>Download PDF</Button>
            </Skeleton>
          </Flex>
        </Col>
      </Row>
      <Flex justify={"center"} vertical>
        <Title level={3} style={{ margin: 0 }}>{t("users.title")}</Title>
        <List
          resource="categoryUsers"
          apiConfig={{ id: categoryId }}
          config={config}
        />
      </Flex>
    </Flex>
  );
};