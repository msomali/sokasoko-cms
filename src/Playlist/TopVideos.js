import React, { useState } from "react";
import get from "lodash/get";
import isUndefined from "lodash/isUndefined";
import { Modal, Form, Input, Transfer, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Connect } from "../State";

import "./styles.css";

const TopVideosCreateForm = ({ visible, onCreate, onCancel, list }) => {
  const [form] = Form.useForm();
  const [selectedVideos, setSelectedVideos] = useState([]);

  const handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys);
    console.log(moveKeys);
    setSelectedVideos(targetKeys);
  };

  const renderItem = (item) => {
    const uploader = get(item, "createdBy.accountNumber");
    const customLabel = (
      <div className="video-item">
        <span>
          {item.title} {!isUndefined(uploader) ? `By ${uploader}` : null}
        </span>
        <Button
          icon={<EyeOutlined />}
          onClick={() => {
            window.open(item.url, "_blank");
          }}
        />
      </div>
    );

    return {
      label: customLabel, // for displayed item
      value: item._id, // for title and filter matching
    };
  };

  const filterOption = (inputValue, option) =>
    option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

  const handleSearch = (dir, value) => {
    console.log("search:", dir, value);
  };

  return (
    <Modal
      visible={visible}
      title="Create a new Video List"
      okText="Create"
      centered
      width={1200}
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
        autoComplete="off"
        size="large"
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
        <Form.Item name="videos" label="Videos" required>
          <Transfer
            dataSource={list}
            onChange={handleChange}
            titles={["All Videos", "Selected Videos"]}
            rowKey={(item) => item._id}
            showSearch
            targetKeys={selectedVideos}
            onSearch={handleSearch}
            filterOption={filterOption}
            render={renderItem}
            listStyle={{
              width: 600,
              height: 400,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Connect(TopVideosCreateForm, {
  list: "media.list",
  loading: "media.loading",
});
