import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.js";
import { apis } from "../networks/apis";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { setUser, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const onFinish = async values => {
    setLoading(true);
    try {
      if (isRegister) {
        await apis.createUser(values);
        message.success("注册成功!");
        setIsRegister(false);
      } else {
        const response = await apis.login(values);
        const token = response.access_token;
        localStorage.setItem("token", token);
        const userData = response.user;
        setUser(userData);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Form
        name={isRegister ? "register" : "login"}
        className="py-12 px-36 bg-[#131722a7] rounded-md shadow-md flex justify-center items-center flex-col w-full backdrop-blur-lg"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div className="font-bold text-3xl mb-8 text-white px-12">
          区块链卡牌交易系统
        </div>
        <Form.Item
          className="w-full"
          name="username"
          rules={[{ required: true, message: "请输入你的用户名!" }]}
        >
          <Input size="large" placeholder="用户名" />
        </Form.Item>
        {isRegister && (
          <Form.Item
            className="w-full"
            name="email"
            rules={[
              { type: "email", message: "输入的不是有效的电子邮件地址!" },
              { required: true, message: "请输入你的电子邮件!" },
            ]}
          >
            <Input
              size="large"
              prefix={<i className="fas fa-envelope" />}
              placeholder="电子邮件"
            />
          </Form.Item>
        )}
        <Form.Item
          className="w-full"
          name="password"
          rules={[{ required: true, message: "请输入你的密码!" }]}
        >
          <Input
            size="large"
            prefix={<i className="fas fa-lock" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        {isRegister && (
          <Form.Item
            className="w-full"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "请确认你的密码!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两个密码不匹配!"));
                },
              }),
            ]}
          >
            <Input
              size="large"
              prefix={<i className="fas fa-lock" />}
              type="password"
              placeholder="确认密码"
            />
          </Form.Item>
        )}
        <Form.Item className="mt-8 w-full">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            {isRegister ? "注册" : "登录"}
          </Button>
        </Form.Item>
        <div className="text-white">
          {isRegister ? (
            <>
              已经有账户?
              <Button type="link" onClick={toggleForm}>
                登录
              </Button>
            </>
          ) : (
            <>
              没有账户?
              <Button type="link" onClick={toggleForm}>
                注册
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Login;
