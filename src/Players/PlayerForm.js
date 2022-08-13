import React from "react";
import Map from "lodash/map";
import moment from "moment";
// import get from "lodash/get";
// import filter from "lodash/filter";
// import Regions from "../GeoLocation/Region.json";
// import Districts from "../GeoLocation/District.json";
// import Wards from "../GeoLocation/Wards.json";
import {
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  Select,
  InputNumber,
  Row,
} from "antd";

const positions = [
  "GOALKEEPER",
  "CENTER BACK",
  "RIGHT BACK",
  "LEFT BACK",
  "WING BACK",
  "OFFENSIVE BACK",
  "DEFENSIVE MIDFIELD",
  "STRIKER",
  "WINGER",
];

const foot = ["RIGHT", "LEFT", "BOTH"];

const PlayerCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  // const regions = get(Regions, "features");
  // const districts = get(Districts, "features");
  // const wards = get(Wards, "features");

  return (
    <Modal
      visible={visible}
      title="Create a new player"
      okText="Create"
      centered
      width={1300}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((fieldValues) => {
            const dob = fieldValues["dob"].format("YYYY-MM-DD");
            const age = moment().diff(dob, "years", false);
            const values = {
              ...fieldValues,
              dob,
              age,
              password: "sokasoko",
            };
            const formData = new FormData();
            for (const name in values) {
              formData.append(name, values[name]); // there should be values.avatar which is a File object
            }
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
        {/* <Form.Item
          name="profileImage"
          label="Profile Image"
          valuePropName="fileList"
          getValueFromEvent={({ file }) => file.originFileObj}
        >
          <Upload
            name="profileImage"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={false}
            onChange={handleChange}
          >
            {imageUrl.value ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <PlusOutlined />
            )}
          </Upload>
        </Form.Item> */}
        <Form.Item
          name="firstName"
          label="FirstName"
          rules={[
            {
              required: true,
              message: "Please provide the firstname",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="LastName"
          rules={[
            {
              required: true,
              message: "Please provide the last name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="PhoneNumber"
          rules={[
            {
              required: true,
              message: "Please provide the last name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" required>
          <Radio.Group>
            <Radio value="M">Male</Radio>
            <Radio value="F">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Row justify="space-between" style={{ padding: "0 20px 0 0" }}>
          <Form.Item
            name="dob"
            label="Date of Birth"
            wrapperCol={{ span: 24 }}
            rules={[
              {
                type: "object",
                required: true,
                message: "Please select time!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="Weight">
            <Form.Item name="weight" noStyle>
              <InputNumber />
            </Form.Item>
            <span className="ant-form-text">Kgs</span>
          </Form.Item>
          <Form.Item label="Height">
            <Form.Item name="height" noStyle>
              <InputNumber />
            </Form.Item>
            <span className="ant-form-text">cms</span>
          </Form.Item>
        </Row>
        {/* <Row justify="space-between">
          <Form.Item name="region" label="Region" wrapperCol={{ span: 24 }}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
            >
              {Map(regions, (value, i) => {
                return (
                  <Select.Option key={i}>
                    {get(value, "properties.region")}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="district" label="District" wrapperCol={{ span: 24 }}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
            >
              {Map(districts, (value, i) => {
                return (
                  <Select.Option key={i}>
                    {get(value, "properties.District")}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name="ward" label="Ward" wrapperCol={{ span: 24 }}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
            >
              {Map(
                filter(wards, ["properties.District", "Bahi District"]),
                (value, i) => {
                  return (
                    <Select.Option key={i}>
                      {get(value, "properties.Ward")}
                    </Select.Option>
                  );
                }
              )}
            </Select>
          </Form.Item>
        </Row> */}
        <Form.Item name="nationality" label="Nationality" hasFeedback>
          <Select placeholder="Please select a nationality">
            <Select.Option value="Tanzanian">Tanzanian</Select.Option>
            <Select.Option value="Kenyan">Kenyan</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="position" label="Position" hasFeedback>
          <Select placeholder="Please select a position">
            {Map(positions, (value, i) => {
              return (
                <Select.Option key={i} value={value}>
                  {value}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="foot" label="Foot Preferred" hasFeedback>
          <Select placeholder="Please select a preferred foot">
            {Map(foot, (value, i) => {
              return (
                <Select.Option key={i} value={value}>
                  {value}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PlayerCreateForm;
