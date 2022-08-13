import React, { useState } from "react";
import { Layout, Row, Col, Form, Input, Button } from "antd";
import ground from "../images/pexels-tima-miroshnichenko-6078297.jpg";

const SignIn = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push("/app/players");
    }, 3000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout.Content style={{ overflowY: "hidden" }}>
      <Row>
        <Col
          span={12}
          style={{
            height: "100vh",
          }}
        >
          <img
            src={ground}
            alt="ground"
            style={{
              objectFit: "fill",
              width: "100%",
              overflowY: "hidden",
            }}
          />
        </Col>
        <Col span={12} style={{ padding: "8px" }}>
          <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Col span={16}>
              <h1 style={{ letterSpacing: "2px" }}>SOKASOKO CMS</h1>
              <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                requiredMark="optional"
                initialValues={{ remember: true }}
                size="large"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    type="primary"
                    block
                    htmlType="submit"
                    loading={loading}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default SignIn;
