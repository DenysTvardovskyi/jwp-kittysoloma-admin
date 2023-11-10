import { FC } from "react";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { List } from "../../components";
import { useUsersConfig } from "./useUsersConfig";
import { useTranslation } from "react-i18next";
import { gql, useQuery } from "@apollo/client";

const EXCHANGE_RATES = gql`
  query pagedUsers {
    pagedUsers(
    skip: null
    take: 30
    where: {
      and: [
        {
          or: [
            { email: { startsWith: "A" } }
          ]
        }
      ]
      role: { eq: SUPER_ADMIN }
    }
    order: { createdAt: DESC, email: DESC }
  ) {
    pageInfo {
      hasNextPage
    }
    totalCount
    items {
      id
      avatarUrl
      email
      lastName
      firstName
      createdAt
    }
  }
  }
`;

interface IProps {}

export const Users: FC<IProps> = (): JSX.Element => {
  const { data, loading, error } = useQuery(EXCHANGE_RATES);
  const navigate = useNavigate();
  const { t } = useTranslation();

  console.log(data)

  const renderView = (record: any) => (
    <Button onClick={() => navigate("/user/" + record.key)}>{t("users.view")}</Button>
  );
  const config = useUsersConfig({ onView: renderView });

  return (
    <Flex gap="small" vertical>
      <Title level={3} style={{ margin: 0 }}>{t("users.title")}</Title>
      {/*<List resource="users" config={config} search />*/}
    </Flex>
  );
};