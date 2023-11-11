import { FC } from "react";
import { Button, Col, Flex, Form, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useApi, useNotification } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IProps {}

export const PlaceCreate: FC<IProps> = (): JSX.Element => {
  const api = useApi();
  const navigate = useNavigate();
  const notification = useNotification();
  const { t } = useTranslation();

  const handleCreate = (body: any) => {
    try {
      api.groups.create({ ...body }).then((r) => {
        notification.success("Success");
        navigate("/group/" + r.id);
      });
    } catch (e: any) {
      notification.error(e);
    }
  };

  const initialValues = {
    name: null,
    description: null,
    minChildAge: null,
    maxChildAge: null,
    minChildCount: null,
    maxChildCount: null,
    customerTraffics: [],
    recommendationDays: [],
    recommendationFrequencies: [],
    conversationStates: [],
  };

  return (

    <Flex gap="small" vertical>
      <Row gutter={[ 24, 24 ]} justify={"center"}>
        <Col xs={24} sm={24} md={24} lg={16} xl={8}>
          <Form
            layout="vertical"
            onFinish={data => handleCreate(data)}
            initialValues={initialValues}
          >
            <Title>{t("groups.createTitle")}</Title>

            <Form.Item>
              <Button htmlType="submit">{t("save")}</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Flex>
  );
};