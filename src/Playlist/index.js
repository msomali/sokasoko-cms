import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  List,
  message,
  Avatar,
  Form,
  Modal,
  Input,
} from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  MinusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import get from "lodash/get";
import { Connect } from "../State/";
import { fetchAdverts, fetchPlayers } from "../State/actions/players";
import {
  fetchMedia,
  createPlaylist,
  fetchPlaylist,
  setActivePlaylist,
  updateAdvert,
} from "../State/actions/medias";
import TopVideosCreateForm from "./TopVideos";

import "./styles.css";
import { dispatch } from "../State/store";

const Playlist = ({ loading, items, videoLink }) => {
  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setVideoModal] = useState(false);

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchPlaylist());
    dispatch(fetchAdverts());
    dispatch(fetchMedia());
  }, []);

  const onCreate = async (values) => {
    console.log(values);
    dispatch(createPlaylist(values))
      .then(() => {
        message.success("Video Playlist created");
        dispatch(fetchPlaylist());
      })
      .catch(() => {
        message.error("Video Playlist failed");
      })
      .finally(() => {
        setShowModal(false);
      });
  };

  const onCreateVideo = async (values) => {
    dispatch(updateAdvert(values))
      .then(() => {
        message.success("Mobile Video created");
      })
      .catch(() => {
        message.error("Mobile Video failed");
      })
      .finally(() => {
        setVideoModal(false);
      });
  };

  const onSetActivePlaylist = async (value) => {
    dispatch(setActivePlaylist(value))
      .then(() => {
        message.success("Video Playlist updated");
        dispatch(fetchPlaylist());
      })
      .catch(() => {
        message.error("Video Playlist failed to update");
      })
      .finally(() => {
        setShowModal(false);
      });
  };

  return (
    <div className="playlist-base">
      <TopVideosCreateForm
        visible={showModal}
        onCreate={onCreate}
        onCancel={() => {
          setShowModal(false);
        }}
      />
      <VideoLinkForm
        visible={showVideoModal}
        onCreate={onCreateVideo}
        videoLink={videoLink}
        onCancel={() => {
          setVideoModal(false);
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
            Create Video PlayList
          </Button>
        </Col>
        <Col flex="200px">
          <Button
            type="default"
            onClick={() => setVideoModal(true)}
            style={{ width: "200px", fontSize: "14px" }}
            icon={<EyeOutlined />}
          >
            Set Default Video
          </Button>
        </Col>
      </Row>
      <List
        dataSource={items}
        style={{ marginTop: "20px" }}
        loading={loading}
        bordered
        itemLayout="horizontal"
        renderItem={({ title, isActive, _id }) => (
          <List.Item
            actions={
              isActive
                ? []
                : [
                    <Button
                      onClick={() => onSetActivePlaylist(_id)}
                      type="primary"
                      icon={<CheckOutlined />}
                    >
                      Set Active
                    </Button>,
                  ]
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    backgroundColor: isActive ? "#87d068" : "lightblue",
                  }}
                  icon={isActive ? <CheckOutlined /> : <MinusOutlined />}
                />
              }
              title={<h2>{title}</h2>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

const VideoLinkForm = ({ visible, onCreate, onCancel, videoLink }) => {
  const [form] = Form.useForm();

  console.log("Video Form", videoLink);
  return (
    <Modal
      visible={visible}
      title="Set Default Video on Mobile"
      okText="Update"
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
        initialValues={{
          link: get(videoLink, "advertVideo", ""),
        }}
      >
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
      </Form>
    </Modal>
  );
};

export default Connect(Playlist, {
  items: "playlist.list",
  videoLink: "player.items.data[0]",
  loading: "playlist.loading",
});
