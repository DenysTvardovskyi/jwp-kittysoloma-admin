import { FC, useEffect, useState } from "react";
import { Col, Flex, Row, Skeleton, Table } from "antd";
import { useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { gql, useLazyQuery } from "@apollo/client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface IProps {}

const NODE = gql`
  query node($id: Long!) {
    nodeById(id: $id) {
    id
    airQualityCategory
    location {
      coordinates
    }
    tags {
      name
      value
    }
  }
}
`;

export const Place: FC<IProps> = (): JSX.Element => {
  const { placeId } = useParams();
  const [ node, setNode ] = useState<any>();
  const [ executeSearch, { loading } ] = useLazyQuery(NODE);

  useEffect(() => {
    if (placeId) {
      executeSearch({ variables: { id: +placeId } }).then((data) => {
        console.log(data);
        setNode(data.data.nodeById);
      });
    }
  }, [ placeId ]);

  const config: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <Flex vertical>
      <Row gutter={[ 24, 24 ]} justify={"center"}>
        <Col xs={24}>
          {!!node && <Skeleton loading={loading} active={true}>
            <Flex justify="space-between" align="center">
              <Title>{node?.id} | {node.tags.find((rec: any) => rec.name === "name:uk").value}</Title>
            </Flex>
          </Skeleton>}
          {!!node && <Skeleton loading={loading} active={true}>
            <MapContainer
              //@ts-ignore
              center={[ node?.location?.coordinates[1], node?.location?.coordinates[0] ]}
              minZoom={12}
              maxZoom={18}
              zoom={16}
            >
              <TileLayer
                //@ts-ignore
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[ node?.location?.coordinates[1], node?.location?.coordinates[0] ]}
              >
                <Popup>
                  location
                </Popup>
              </Marker>
            </MapContainer>
          </Skeleton>}
          <Skeleton loading={loading} active={true} style={{ marginTop: 16 }}>
            <Flex justify="space-between" align="center" style={{ marginTop: 16 }}>
              <Table

                loading={loading}
                columns={config}
                dataSource={node?.tags?.filter((tag: any) => !tag.name.includes("name")) || []}
                scroll={{ x: 600 }}
              />
            </Flex>
          </Skeleton>
        </Col>
      </Row>
    </Flex>
  );
};