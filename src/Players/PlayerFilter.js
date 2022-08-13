import { Modal, Form, DatePicker, Radio, InputNumber, Select } from "antd";
import get from "lodash/get";
import map from "lodash/map";
import Regions from "../GeoLocation/Region.json";
import Districts from "../GeoLocation/District.json";

const PlayerFilter = ({ visible, onSearch, onCancel }) => {
  const [form] = Form.useForm();
  const regions = get(Regions, "features");
  const districts = get(Districts, "features");
  return (
    <Modal
      visible={visible}
      title="Filter Players"
      okText="Filter"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onSearch(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="player_filter">
        <Form.Item name="age" label="Date of Birth">
          <DatePicker size="large" showToday="false" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Radio.Group>
            <Radio value="M">Male</Radio>
            <Radio value="F">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Weight">
          <Form.Item name="weight" noStyle>
            <InputNumber min={0} />
          </Form.Item>
          <span className="ant-form-text">Kgs</span>
        </Form.Item>
        <Form.Item label="Height">
          <Form.Item name="height" noStyle>
            <InputNumber min={0} />
          </Form.Item>
          <span className="ant-form-text">cms</span>
        </Form.Item>
        <Form.Item label="Region" name="region">
          <Select style={{ width: 200 }} placeholder="Search to Select">
            {map(regions, (value, i) => {
              return (
                <Select.Option key={i}>
                  {get(value, "properties.region")}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="District" name="district" dependencies={["region"]}>
          <Select style={{ width: 200 }} placeholder="Search to Select">
            {map(districts, (value, i) => {
              return (
                <Select.Option key={i}>
                  {get(value, "properties.District")}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PlayerFilter;
