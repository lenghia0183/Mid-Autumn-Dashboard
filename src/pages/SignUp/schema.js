import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object().shape({
    fullName: Yup.string()
      .required("Tên đăng nhập là bắt buộc")
      .min(4, "Tên đăng nhập phải có ít nhất 4 ký tự"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });
};

export default validationSchema;
