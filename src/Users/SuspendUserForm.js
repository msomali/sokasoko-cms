import { Modal, Form, Input } from "antd";

export const SuspendUserForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Reason for Suspension"
      okText="Suspend"
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
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item name="reason" label="Reason">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
