"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, message, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { loginUser, getUserInfo } from "../../app/src/lib/strapi"; // adjust path
import { setAuth } from "../utils/auth"; // adjust path

const BRAND_COLOR = "#07518a";

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Login
      const loginData = await loginUser(identifier, password);
      const jwt = loginData.jwt;

      // Step 2: Fetch user details with role
      const userInfo = await getUserInfo(jwt);
      const roleType = (userInfo.role?.type || "").toLowerCase();
      const roleName = (userInfo.role?.name || "").toLowerCase();

      // Save auth
      setAuth(jwt, roleType, roleName);

      message.success(`Welcome ${userInfo.username || "User"}!`);

      // Step 3: Redirect based on role
      if (roleType === "superadmin" || roleName === "superadmin") {
        router.replace("/super-admin");
      } else if (roleType === "admin" || roleName === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } catch (err: any) {
      console.error(err);
      message.error(err || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 relative">
      {/* ===== Left Logo Panel ===== */}
      <div
        className="hidden md:flex w-1/2 items-center justify-center bg-white shadow-md"
        style={{
          background: "linear-gradient(135deg, #07518a 0%, #0a6ab8 100%)",
        }}
      >
        <div className="text-center">
          <img
            src="/highbtlogo-white-tm.png"
            alt="Brihaspathi Logo"
            className="mx-auto mb-6 w-48 h-auto"
          />
          <h1 className="text-white text-3xl font-bold mb-2">
            Brihaspathi Technologies
          </h1>
          <p className="text-blue-100 text-lg">Empowering AI & Digital Solutions</p>
        </div>
      </div>

      {/* ===== Right Form Panel ===== */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2
            className="text-2xl font-bold text-center mb-6"
            style={{ color: BRAND_COLOR }}
          >
            Login to Dashboard
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email or Username
              </label>
              <Input
                size="large"
                placeholder="Enter email or username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Password
              </label>
              <Input.Password
                size="large"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              style={{
                backgroundColor: BRAND_COLOR,
                borderColor: BRAND_COLOR,
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Brihaspathi Technologies Ltd.
          </div>
        </div>
      </div>

      {/* ===== Loading Overlay ===== */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <Spin size="large" tip="Authenticating...">
            {/* Invisible wrapper to satisfy AntD requirement */}
            <div style={{ width: 0, height: 0 }}></div>
          </Spin>
        </div>
      )}
    </div>
  );
};

export default Login;
