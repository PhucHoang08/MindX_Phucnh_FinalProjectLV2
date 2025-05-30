import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';

import LiImage1 from '../image/LogInImage/LiImage1.jpg';
import LiImage2 from '../image/LogInImage/LiImage2.jpg';
import LiImage3 from '../image/LogInImage/LiImage3.jpg';
import LiImage4 from '../image/LogInImage/LiImage4.jpg';

import fetchUsers from '../API/userAPI'

function LogIn() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Khởi tạo hook điều hướng


    // Nếu đã đăng nhập thì tự động chuyển hướng sang trang hello
    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        navigate("/");
      }
    }, [navigate]);

    const validationSchema = Yup.object({
        email: Yup.string()
          .trim()
          .email('INVALID EMAIL!')
          .required('EMAIL IS REQUIRED!')
          .test('no-spaces', 'EMAIL MUST NOT CONTAIN SPACES!', value => !/\s/.test(value)),
      
        password: Yup.string()
          .trim()
          .min(8, 'PASSWORD SHOULD HAVE MIN 8 CHARACTERS!')
          .matches(/[a-zA-Z]/, 'PASSWORD MUST CONTAIN LETTERS!')
          .matches(/\d/, "PASSWORD MUST CONTAIN NUMBERS!")
          .required('PASSWORD IS REQUIRED!')
          .test('no-spaces','PASSWORD MUST NOT CONTAIN SPACES!',value => !/\s/.test(value)),
      });
      ;

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
          const accounts = await fetchUsers();
      
          const user = accounts.find(
            (acc) =>
              acc.email.trim() === values.email.trim() &&
              acc.password === values.password
          );
      
      
          // Đăng nhập thành công
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", "true");
      
          if (user.role === "admin") {
            navigate("/admin/products");
          } else {
            navigate("/");
          }
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            // Formik sẽ tự động hiển thị lỗi ở ErrorMessage nếu lỗi đúng chuẩn Yup
            throw error;
          }

          console.error("❌ Lỗi hệ thống khi đăng nhập:", error);
          alert("Log in failed, please try again");
        } finally {
          setSubmitting(false);
        }
      };
      

    return (
        <div className='w-full h-[970px] flex flex-row items-center justify-between'>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, isValid }) => (
                    <Form className="w-full h-full flex flex-wrap flex-row justify-evenly items-center">
                        <div className="w-1/2 h-full flex flex-col justify-center items-center flex-wrap">
                            <div className="flex gap-[20px] ">
                                <div>
                                    <div className="shadow-xl shadow-gray-500/50 border-[2px] border-black mb-[20px]">
                                        <img src={LiImage1} className='w-[350px] h-[400px] object-cover' alt="" />
                                    </div>
                                    <div className="shadow-xl shadow-gray-500/50 border-[2px] border-black">
                                        <img src={LiImage2} className='w-[350px] h-[500px] object-cover' alt="" />
                                    </div>
                                </div>
                                <div>
                                    <div className="shadow-xl shadow-gray-500/50 border-[2px] border-black mb-[20px]">
                                        <img src={LiImage3} className='w-[350px] h-[450px] object-cover' alt="" />
                                    </div>
                                    <div className="shadow-xl shadow-gray-500/50 border-[2px] border-black">
                                        <img src={LiImage4} className='w-[350px] h-[450px] object-cover' alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-[750px] h-[900px] flex justify-center items-center bg-white rounded-[40px]'>
                            <div className='w-full h-full flex flex-col pt-[100px] ml-[140px]'>
                                <h1 className='font-maxtield h-[110px] text-[80px]'>Hey, Welcome !!!</h1>
                                <p className='font-futura text-[25px] text-gray-400 mb-[30px]'>Please enter your details</p>

                                {/* Email Field */}
                                <div className='w-[450px] mb-[30px]'>
                                    <label className="font-futura h-[40px] block text-[30px] mb-[10px]">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className='w-full h-[50px] mb-[10px] border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-gray-700 placeholder-gray-400 transition-all duration-300 shadow-md'
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className='font-futura text-red-500 text-[15px] transition-all duration-300'
                                    />
                                </div>

                                {/* Password Field */}
                                <div className='w-[450px] mb-[30px]'>
                                    <label className="font-futura h-[40px] block text-[30px] mb-[10px]">Password</label>
                                    <div className="relative">
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter your password"
                                            className='w-full h-[50px] mb-[10px] border border-gray-400 rounded px-4 py-2 pr-12 focus:outline-none focus:ring-gray-700 placeholder-gray-400 transition-all duration-300 shadow-md'
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="h-[50px] absolute inset-y-0 right-0 px-3 text-gray-500"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? '🙈' : '👁️'}
                                        </button>
                                    </div>
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className='font-futura text-red-500 text-[15px] transition-all duration-300'
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !isValid}
                                    className={`
                                    font-futura text-[30px] w-[450px] h-[65px] cursor-pointer text-white  rounded-[5px] transition-all duration-300
                                    ${
                                        isSubmitting
                                          ? "bg-gray-400 cursor-not-allowed"
                                          : "bg-black hover:!bg-red-500"
                                      }
                                    `}
                                >
                                    {isSubmitting ? "PLEASE WAIT..." : "LOG IN"}
                                </button>

                                {/* Sign Up Link */}
                                <div className='mt-[20px]'>
                                    <p className="font-futura text-[20px] text-gray-400">
                                        Don't have an account?{' '}
                                        <Link to="/signup" className="text-black hover:!text-red-500 transition-all duration-300">
                                            Sign Up
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default LogIn;
