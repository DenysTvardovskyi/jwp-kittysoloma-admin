import { FC } from "react";
import { useTranslation } from "react-i18next";
import {  Flex } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

interface IProps {}

export const Dashboard: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Flex gap={"small"} vertical>
      <Title>{t("home.title")}</Title>
      <Text>{t("home.welcome")}</Text>
    </Flex>
  );
};