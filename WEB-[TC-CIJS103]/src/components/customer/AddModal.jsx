// import giữ nguyên
import React, { useState,useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from 'react-router-dom'

const AddProductModal = ({ setShowAddModal, isLoading }) => {
  const API_KEY = "67fe688cc590d6933cc1248f";
  const BASE_URL = `https://mindx-mockup-server.vercel.app/api/resources/dataUsers`;
  const navigate = useNavigate()


  const validationSchema = Yup.object({
    fullName: Yup.string()
      .trim('NO LEADING OR TRAILING SPACES ALLOW')
      .required('FULL NAME IS REQUIRED!')
      .test(
        "no-multiple-spaces",
        "MUST NOT CONTAIN MULTIPLE SPACES!",
        (value) => !/\s{2,}/.test(value)
      ),
    email: Yup.string()
      .trim('NO LEADING OR TRAILING SPACES ALLOW')
      .email("INVALID EMAIL!")
      .required("EMAIL IS REQUIRED!")
      .test('no-spaces', 'MUST NOT CONTAIN SPACES!', value => !/\s/.test(value)),
    phone: Yup.string()
      .trim('NO LEADING OR TRAILING SPACES ALLOW')
      .required("PHONE IS REQUIRED!")
      .matches(/^\d+$/, 'PHONE MUST CONTAIN ONLY NUMBERS!')
      .min(10, 'MUST BE AT LEAST 10 NUMBERS!')
      .max(10, 'MUST NOT BE MORE THAN 10 NUMBERS!')
      .test('no-spaces', 'MUST NOT CONTAIN SPACES!', value => !/\s/.test(value)),
    password: Yup.string()
      .trim('NO LEADING OR TRAILING SPACES ALLOW')
      .min(8, 'MUST BE AT LEAST 8 CHARACTERS!')
      .required('PASSWORD IS REQUIRED!')
      .matches(/[a-zA-Z]/, "PASSWORD MUST CONTAIN LETTERS!")
      .matches(/\d/, "PASSWORD MUST CONTAIN NUMBERS!")
      .test('no-spaces', 'MUST NOT CONTAIN SPACES!', value => !/\s/.test(value)),
    confirmPassword: Yup.string()
      .trim('NO LEADING OR TRAILING SPACES ALLOW')
      .oneOf([Yup.ref("password"), null], "PASSWORD MUST MATCH")
      .required("CONFIRM PASSWORD IS REQUIRED!")
      .test('no-spaces', 'MUST NOT CONTAIN SPACES!', value => !/\s/.test(value)),
  });

  const handleSignUp = async (values, { setSubmitting, setErrors, resetForm }) => {
    const newUser = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      phone: values.phone,
      role: "user", // mặc định là user
    };

    try {
      // Bước 1: Kiểm tra trùng email
      const res = await fetch(
        `${BASE_URL}?apiKey=${API_KEY}`
    );
      const data = await res.json();
      const existingUsers = data?.data?.data || [];

      const emailExists = existingUsers.some(
        (user) =>
          user.email.trim().toLowerCase() === values.email.trim().toLowerCase()
      );

      if (emailExists) {
        setErrors({ email: "EMAIL ALREADY EXISTS!" });
        setSubmitting(false);
        return;
      }

      // Bước 2: Gửi dữ liệu để tạo tài khoản
      const response = await fetch(
        `${BASE_URL}?apiKey=${API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        }
    );
      if (!response.ok) {
        throw new Error("Đăng ký thất bại");
      }
      console.log("✅ Đăng ký thành công");
      resetForm()
      navigate("/admin/customers");
    } catch (error) {
      console.error("❌ Lỗi khi đăng ký:", error);
      alert("Đăng ký thất bại, thử lại sau.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded shadow-md w-1/2 space-y-4">
        <h2 className="text-xl font-futura">CREATE NEW USER</h2>

        <Formik
          initialValues={{ fullName: "", email: "", phone: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="space-y-4">


              <div>
                <Field type="text" name="fullName" placeholder="Full name account" className="w-full p-2 border rounded" />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field type="email" name="email" placeholder="Email account" className="w-full p-2 border rounded" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field type="text" name="phone" placeholder="Phone account" className="w-full p-2 border rounded" />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <Field type="password" name="password" placeholder="Password account" className="w-full p-2 border rounded" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <Field type="password" name="confirmPassword" placeholder="Confirm password account" className="w-full p-2 border rounded" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>



              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                  }}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 transition-all duration-300"
                  disabled={isLoading}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="relative bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 transition-all duration-300"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#1DC7FF" stroke="#1DC7FF" stroke-width="15" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.7" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate></circle><circle fill="#1DC7FF" stroke="#1DC7FF" stroke-width="15" opacity=".8" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.7" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate></circle><circle fill="#1DC7FF" stroke="#1DC7FF" stroke-width="15" opacity=".6" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.7" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate></circle><circle fill="#1DC7FF" stroke="#1DC7FF" stroke-width="15" opacity=".4" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.7" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate></circle><circle fill="#1DC7FF" stroke="#1DC7FF" stroke-width="15" opacity=".2" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.7" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate></circle></svg>
                      CREATE...
                    </span>
                  ) : (
                    "CREATE"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProductModal;
