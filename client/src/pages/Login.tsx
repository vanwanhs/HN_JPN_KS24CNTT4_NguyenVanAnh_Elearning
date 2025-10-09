import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [showModal, setShowModal] = useState(false);

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
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
        //   Swal.fire({
        //   position: "top-end",
        //   icon: "success",
        //   title: "Your work has been saved",
        //   showConfirmButton: false,
        //   timer: 1500
        // });
          if (role === "user") {
            navigate("/home");
          } else {
            navigate("/manager");
          }
        }, 2000); // 2s rồi chuyển trang
      } else {
        setErrors({ ...newErrors, login: "Email hoặc mật khẩu không đúng." });
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setErrors({ ...newErrors, login: "Đã xảy ra lỗi trong quá trình đăng nhập." });
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="modal-message"> Đăng nhập thành công!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
