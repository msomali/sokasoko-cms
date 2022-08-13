import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import {
  Row,
  Col,
  Button,
  List,
  Avatar,
  message,
  Popconfirm,
  Form,
  Modal,
  Input,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  MinusOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import { fetchPlayers } from "../State/actions/players";
import {
  fetchVideo,
  setActiveVideo,
  deleteVideo,
  createVideo,
} from "../State/actions/medias";

import { Connect } from "../State/";
import { dispatch } from "../State/store";

import "./styles.css";

const YTPage = ({ items, loading }) => {
  const [showModal, setModal] = useState(false);

  const onSetActiveVideo = async (value) => {
    dispatch(setActiveVideo(value))
      .then(() => {
        message.success("Youtube Video updated");
        dispatch(fetchVideo());
      })
      .catch(() => {
        message.error("Youtube Video failed to update");
      })
      .finally(() => {
        // setShowModal(false);
      });
  };

  const onDelete = async (value) => {
    dispatch(deleteVideo(value))
      .then(() => {
        message.success("Youtube Video deleted successfully");
        dispatch(fetchVideo());
      })
      .catch(() => {
        message.error("Youtube Video deletion failed");
      })
      .finally(() => {});
  };

  const onCreateVideo = async (values) => {
    dispatch(createVideo(values))
      .then(() => {
        message.success("Youtube Video created");
        dispatch(fetchVideo());
      })
      .catch(() => {
        message.error("Youtube Video failed");
      })
      .finally(() => {
        setModal(false);
      });
  };

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchVideo());
  }, []);

  return (
    <>
      <VideoLinkForm
        visible={showModal}
        onCreate={onCreateVideo}
        onCancel={() => {
          setModal(false);
        }}
      />
      <div className="video-base">
        <div style={{ height: "100px" }}></div>
        <Row gutter={4}>
          <Col flex="200px">
            <Button
              type="primary"
              onClick={() => setModal(true)}
              style={{ width: "200px", fontSize: "14px" }}
              icon={<PlusOutlined />}
            >
              Add Youtube Video
            </Button>
          </Col>
        </Row>
        <List
          dataSource={items}
          style={{ marginTop: "20px" }}
          loading={loading}
          bordered
          itemLayout="horizontal"
          renderItem={({
            title,
            _id,
            active,
            description,
            createdAt,
            link,
          }) => (
            <List.Item
              actions={[
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => {
                    window.open(link, "_blank");
                  }}
                />,
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
                <Button
                  onClick={() => onSetActiveVideo(_id)}
                  type="primary"
                  disabled={active}
                  icon={<CheckOutlined />}
                >
                  Set Active
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: active ? "#87d068" : "lightblue",
                    }}
                    icon={active ? <CheckOutlined /> : <MinusOutlined />}
                  />
                }
                title={<h2>{title}</h2>}
                description={
                  <p>
                    {description}- <TimeAgo date={createdAt} />
                  </p>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

const VideoLinkForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Set Youtube Video on Mobile"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{}}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please provide advert title",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
        <Form.Item
          name="link"
          label="Link"
          rules={[
            {
              required: true,
              message: "Please Provide youtube Link!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="mandatory" valuePropName="checked">
          <Checkbox>Mandantory</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Connect(YTPage, {
  items: "video.data",
  loading: "video.loading",
});
