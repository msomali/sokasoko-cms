import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  List,
  Card,
  message,
  Popconfirm,
  Form,
  InputNumber,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import get from "lodash/get";
import { Connect } from "../State/";
import {
  fetchAdverts,
  createAdvert,
  deleteAdvert,
  fetchPlayers,
} from "../State/actions/players";
import { updateAdvertTimer } from "../State/actions/medias";
import AdvertCreateForm from "./AdvertCreateForm";

import "./styles.css";
import { dispatch } from "../State/store";

const { Meta } = Card;

const Advert = ({ loading, items, duration }) => {
  const [showModal, setShowModal] = useState(false);
  const [number, setNumber] = useState({
    value: 0,
  });

  const onCreate = async (values) => {
    const data = new FormData();
    data.append("title", get(values, "title"));
    data.append("description", get(values, "description"));
    data.append("photo", get(values, "photo[0].originFileObj"));

    dispatch(createAdvert(data))
      .then(() => {
        message.success("Advert created");
        dispatch(fetchAdverts());
      })
      .catch(() => {
        message.error("Advert creation failed");
      })
      .finally(() => {
        setShowModal(false);
      });
  };

  const onDelete = async (id) => {
    const values = { id };
    dispatch(deleteAdvert(values))
      .then(() => {
        message.success("Advert deleted successfully");
        dispatch(fetchAdverts());
      })
      .catch(() => {
        message.error("Advert deletion failed");
      })
      .finally(() => {});
  };

  const onUpdateTimer = async (values) => {
    dispatch(updateAdvertTimer(values))
      .then(() => {
        message.success("Advert Timer Set successfully");
        dispatch(fetchAdverts());
      })
      .catch(() => {
        message.error("Advert Setting Timer failed");
      })
      .finally(() => {});
  };

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchAdverts());
  }, []);

  const onFinish = (values) => {
    onUpdateTimer(values);
  };
  console.log("Duration", duration);
  return (
    <div className="advert-base">
      <AdvertCreateForm
        visible={showModal}
        onCreate={onCreate}
        onCancel={() => {
          setShowModal(false);
        }}
      />

      <div style={{ height: "100px" }}></div>
      <Row gutter={4}>
        <Col flex="200px">
          <Button
            type="primary"
            onClick={() => setShowModal(true)}
            style={{ width: "200px", fontSize: "14px" }}
            icon={<PlusOutlined />}
          >
            Create Advert
          </Button>
        </Col>
        <Col flex="500px" style={{ marginLeft: "30px" }}>
          <Form
            layout="inline"
            onFinish={onFinish}
            initialValues={{ duration: duration }}
          >
            <Form.Item label="Advert Duration Time (minutes)" name="duration">
              <InputNumber
                min={1}
                max={60}
                value={number.value}
                prefix="minutes"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={items.data}
        style={{ marginTop: "20px" }}
        loading={loading}
        renderItem={({ title, description, photo, _id }) => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt={title} src={photo} />}
              actions={[
                <Popconfirm
                  placement="topRight"
                  title={"Are you sure you want to delete?"}
                  onConfirm={() => onDelete(_id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
            >
              <Meta title={title} description={description} />
            </Card>
            ,
          </List.Item>
        )}
      />
    </div>
  );
};

export default Connect(Advert, {
  items: "advert.items",
  loading: "advert.loading",
  duration: "player.items.data[0].advertDuration",
});
