import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { email: "", password: "", login: "" };

    if (!email) {
      newErrors.email = "Vui lòng nhập email";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      const userRes = await axios.get(
        `http://localhost:8080/users?email=${email}&password=${password}`
      );
      const managerRes = await axios.get(
        `http://localhost:8080/manager?email=${email}&password=${password}`
      );

      let user = null;
      let role = "";

      if (userRes.data.length > 0) {
        user = userRes.data[0];
        role = "user";
      } else if (managerRes.data.length > 0) {
        user = managerRes.data[0];
        role = "admin";
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify({ ...user, role }));

        //  Hiển thị thông báo thành công bằng SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công!",
          text: role === "user" ? "Chào mừng bạn quay lại!" : "Chào quản trị viên!",
          showConfirmButton: false,
          timer: 1500,
          position: "center",
        });

        setTimeout(() => {
          if (role === "user") {
            navigate("/home");
          } else {
            navigate("/manager");
          }
          window.location.reload();
        }, 1600);
      } else {
        //  Thông báo lỗi đăng nhập sai
        Swal.fire({
          icon: "error",
          title: "Đăng nhập thất bại!",
          text: "Email hoặc mật khẩu không đúng.",
          confirmButtonText: "Thử lại",
        });
        setErrors({ ...newErrors, login: "Email hoặc mật khẩu không đúng." });
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi hệ thống!",
        text: "Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.",
        confirmButtonText: "OK",
      });
      setErrors({
        ...newErrors,
        login: "Đã xảy ra lỗi trong quá trình đăng nhập.",
      });
    }
  };

  return (
    <div className="container">
      <h2>Đăng nhập</h2>
      <p className="description">Đăng nhập tài khoản để sử dụng hệ thống quản lý.</p>

      <form id="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          id="email"
          type="email"
          placeholder="anh@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="error-message">{errors.email}</span>

        <label>Mật khẩu</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="error-message">{errors.password}</span>

        <div className="options">
          <div className="remember">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember">Nhớ tài khoản</label>
          </div>
          <a href="#">Quên mật khẩu?</a>
        </div>

        <span className="error-message">{errors.login}</span>

        <button type="submit">Đăng nhập</button>
      </form>

      <p className="login-link">
        Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  );
}

export default Login;
