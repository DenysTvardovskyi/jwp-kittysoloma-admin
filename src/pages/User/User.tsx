import { FC, useEffect, useState } from "react";
import { Avatar, Descriptions, Flex, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { gql, useLazyQuery } from "@apollo/client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface IProps {}

const USER = gql`
  query user($id: UUID) {
   firstOrDefaultUser(
    where: {
      id: {eq: $id}
    }
  ) {
     id
     firstName
     lastName
     avatarUrl
     email
     createdAt
     lastLoginLatitude
     lastLoginLongitude
     role
  }
}
`;

const tableData: any = {
  id: "id",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  role: "role",
  createdAt: "createdAt",
};

export const User: FC<IProps> = (): JSX.Element => {
  const { userId } = useParams();
  const { t } = useTranslation();
  const [ user, setUser ] = useState<any>();
  const [ executeSearch ] = useLazyQuery(USER);

  useEffect(() => {
    if (userId) {
      executeSearch({ variables: { id: userId } }).then((data) => {
        console.log(data);
        setUser(data.data.firstOrDefaultUser);
      });
    }
  }, [ userId ]);

  const items = user
    ? Object.keys(tableData).map((key: any) => ({
      key,
      label: tableData[key],
      children: key === "region" ? user[key].name : user[key],
    }))
    : [];

  return (
    <Flex gap="small" vertical>
      <Skeleton loading={!user} active={true}>
        {!!user?.avatarUrl
          ? <Avatar size="large" src={user.avatarUrl} />
          : <Avatar size="large">{user?.firstName[0]} {user?.lastName[0]}</Avatar>}
        {!!user && <Descriptions title={t(`user-info.title`)}>
          {items.map((item) => {
            if (item.key.includes("At")) {
              return (
                <Descriptions.Item key={item.key} label={t(`user-info.${item.key}`)}>
                  {new Date(item.children).toLocaleString()}
                </Descriptions.Item>
              );
            }

            return (
              <Descriptions.Item key={item.key} label={t(`user-info.${item.key}`)}>
                {item.children}
              </Descriptions.Item>
            );
          })}
        </Descriptions>}
      </Skeleton>
      {!!user && user?.lastLoginLatitude && user?.lastLoginLongitude && <Skeleton loading={!user} active={true}>
        <MapContainer
          center={[ user?.lastLoginLatitude, user?.lastLoginLongitude ]}
          minZoom={12}
          maxZoom={18}
          zoom={16}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[ user?.lastLoginLatitude, user?.lastLoginLongitude ]}
          >
            <Popup>
              location
            </Popup>
          </Marker>
        </MapContainer>
      </Skeleton>}
    </Flex>
  );
};