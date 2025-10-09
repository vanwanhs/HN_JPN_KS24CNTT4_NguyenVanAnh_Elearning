import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Register.css";

export default function Register() {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [errors, setErrors] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
    duplicate: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = {
      lastname: "",
      firstname: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: "",
      duplicate: ""
    };

    if (!lastname) newErrors.lastname = "Vui lòng nhập họ và tên đệm";
    if (!firstname) newErrors.firstname = "Vui lòng nhập tên";
    if (!email) newErrors.email = "Vui lòng nhập email";
    if (!password) newErrors.password = "Vui lòng nhập mật khẩu";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    if(password.length < 8) newErrors.password = "Mật khẩu ít nhất 8 kí tự";
    if (!terms) newErrors.terms = "Bạn cần đồng ý với điều khoản";

    const valid = Object.values(newErrors).every((err) => err === "");
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      // Kiểm tra email trùng
      const res = await axios.get(`http://localhost:8080/users?email=${email}`);
      if (res.data.length > 0) {
        setErrors({ ...newErrors, duplicate: "Email đã được đăng ký!" });
        return;
      }

      // Tạo đối tượng user mới
      const newUser = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password,
        role: "user",
        gender: 0,
        date_of_birth: "13/12/2000",
        address: "",
        avatar: "https://example.com/default-avatar.jpg",
        phone_number: "",
        created_at: new Date().toISOString()
      };

      
      await axios.post("http://localhost:8080/users", newUser);

      
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
    }
  };

  return (
    <div className="container">
      <h2>Đăng ký tài khoản</h2>
      <p>Đăng ký tài khoản để sử dụng dịch vụ</p>
      <form onSubmit={handleSubmit}>
        <div className="name-fields">
          <div>
            <label>Họ và tên đệm</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <span className="error-message">{errors.lastname}</span>
          </div>
          <div>
            <label>Tên</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <span className="error-message">{errors.firstname}</span>
          </div>
        </div>

        <label>Email</label>
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="error-message">{errors.email || errors.duplicate}</span>

        <label>Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="error-message">{errors.password}</span>

        <label>Xác nhận mật khẩu</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span className="error-message">{errors.confirmPassword}</span>

        <div className="terms">
          <input
            className="checkbox"
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          <label>
            Bạn đồng ý với <a href="#">chính sách và điều khoản</a>
          </label>
        </div>
        <span className="error-message">{errors.terms}</span>

        <button type="submit">Đăng ký</button>
      </form>

      <p className="login-link">
        Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
}
