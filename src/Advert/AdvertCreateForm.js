import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AdvertCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <Modal
      visible={visible}
      title="Create a new Advert"
      okText="Create"
      centered
      width={700}
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
        wrapperCol={{ span: 24 }}
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
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
        <Form.Item
          name="photo"
          label="Photo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="photo"
            listType="picture"
            beforeUpload={() => false}
            multiple={false}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdvertCreateForm;
