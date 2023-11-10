import { FC, useEffect, useState } from "react";
import { Button, Card, Col, Flex, Row, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks";
import { IGroup } from "../../models/group";
import Title from "antd/es/typography/Title";

interface IProps {}

const getDate = (date: any) => new Date(date).toLocaleDateString(
  "en-US",
  { year: "numeric", month: "2-digit", day: "numeric" },
);

export const Place: FC<IProps> = (): JSX.Element => {
  const { placeId } = useParams();
  const api = useApi();
  const [ placeData, setPlaceData ] = useState<IGroup>();

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
  }

  useEffect(() => {
    if (placeId) {
      api.groups.one({ id: placeId }).then((place) => setPlaceData(place.items[0]));
    }
  }, [ groupId ]);

  const handleDownload = () => {
    if (placeId) {
      api.groups.download({ id: placeId }).then((res) => console.log(res));
    }
  };

  return (
    <Flex vertical>
      <Row gutter={[ 24, 24 ]} justify={"center"}>
        <Col xs={24} sm={24} md={24} lg={16} xl={8}>
          <Skeleton loading={!placeData} active={true}>
            <Flex justify="space-between" align="center">
              <Title>{placeData?.name}</Title>
            </Flex>

          </Skeleton>

          <Flex vertical gap={"middle"}>
            <Skeleton loading={!placeData} active={true}>
              <Card title={tableLabels.customersCount}>
                <Title level={2}>{placeData?.customersCount}</Title>
              </Card>
            </Skeleton>
            <Skeleton loading={!placeData} active={true}>
              <Card title={tableLabels.createdAt}>
                <Title level={2}>{getDate(placeData?.createdAt)}</Title>
              </Card>
            </Skeleton>
            <Skeleton loading={!placeData} active={true}>
              {placeData?.updatedAt &&
                <Card title={tableLabels.updatedAt}>
                  <Title level={2}>{getDate(placeData?.updatedAt)}</Title>
                </Card>}
            </Skeleton>
            <Skeleton loading={!placeData} active={true}>
              <Button onClick={handleDownload}>Download PDF</Button>
            </Skeleton>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};