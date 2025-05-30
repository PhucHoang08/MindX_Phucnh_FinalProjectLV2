import React, { useState,useEffect } from 'react'
import * as Yup from 'yup';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom'

import SuImage1 from '../image/SignUpImage/SuImage1.jpg';
import SuImage2 from '../image/SignUpImage/SuImage2.jpg';
import SuImage3 from '../image/SignUpImage/SuImage3.jpg';
import SuImage4 from '../image/SignUpImage/SuImage4.jpg';

function SignUp() {
    const API_KEY = "67fe688cc590d6933cc1248f";
    const BASE_URL = `https://mindx-mockup-server.vercel.app/api/resources/dataUsers`;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
          navigate("/");
        }
      }, [navigate]);

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


    const handleSignUp = async (values, { setSubmitting, setErrors }) => {
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
                setErrors({ email: "Email đã tồn tại!" });
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
            navigate("/login");
        } catch (error) {
            console.error("❌ Lỗi khi đăng ký:", error);
            alert("Đăng ký thất bại, thử lại sau.");
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <div className='w-full h-[970px] flex flex-row items-center justify-between'>
            <Formik
                className="w-full h-full"
                initialValues={{
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',


                }}
                validationSchema={validationSchema}
                onSubmit={handleSignUp}
            >
                {({ isSubmitting, isValid }) => (
                    <Form className="w-full h-full flex flex-wrap flex-row justify-evenly items-center">
                        <div className='w-[750px] h-fit  flex jusify-center items-center bg-white rounded-[40px]'>
                            <div className='w-full h-full flex flex-col ml-[100px]'>
                                <h1 className='font-maxtield h-[70px] text-[70px]'>Create your account</h1>
                                <p className='font-futura text-[40px] text-gray-400'>Let's create your account</p>

                                <div className='w-[450px] h-fit flex flex-row justify-between items-center gap-4'>
                                    {/* Full Name */}
                                    <div className='w-1/2 mb-[15px] mt-[20px]'>
                                        <label className=" h-[40px] block font-futura text-[30px] mb-[10px]">Full name</label>
                                        <Field
                                            type="text"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            className='w-full h-[50px] mb-[10px] border border-gray-400 rounded px-4 py-2 focus:outline-none  focus:ring-gray-700 placeholder-gray-400 transition-all duration-300 shadow-md' />
                                        <ErrorMessage
                                            name="fullName"
                                            component="div"
                                            className='text-red-500 text-sm font-semibold' />
                                    </div>

                                    {/* Email */}
                                    <div className='w-1/2'>
                                        <label className=" h-[40px] block font-futura text-[30px] mb-[10px]">Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            className='w-full h-[50px] mb-[10px] border border-gray-400 rounded px-4 py-2 focus:outline-none  focus:ring-gray-700 placeholder-gray-400 transition-all duration-300 shadow-md' />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className='text-red-500 text-sm font-semibold' />
                                    </div>

                                </div>

                                {/* Phone */}
                                <div className='w-[450px]'>
                                    <label className=" h-[40px] block font-futura text-[30px] mb-[10px]">Phone</label>
                                    <Field
                                        type="text"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        className='w-full h-[50px] mb-[10px] border border-gray-400 rounded px-4 py-2 focus:outline-none  focus:ring-gray-700 placeholder-gray-400 transition-all duration-300 shadow-md' />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className='text-red-500 text-sm font-semibold' />
                                </div>

                                {/* Password */}
                                <div className='w-[450px]'>
                                    <label className="font-futura h-[40px] block text-[30px] mb-[10px]">Password</label>
                                    <div className="relative">
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter your password"
                                            className='w-full h-[50px] mb-[10px] border border-gray-400 rounded px-4 py-2 focus:outline-none  focus:ring-gray-700 placeholder-gray-400 transition-all duration-300 shadow-md'
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className=" h-[50px] absolute inset-y-0 right-0 px-3 text-gray-500"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? '🙈' : '👁️'}
                                        </button>
                                    </div>
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className='text-red-500 text-sm font-semibold'
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div className='w-[450px] mb-[30px]'>
                                    <label className="font-futura h-[40px] block text-[30px] mb-[10px]">Confirm password</label>
                                    <div className="relative">
                                        <Field
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Enter your password again"
                                            className='w-full h-[50px] mb-[10px] border border-gray-400 rounded px-4 py-2 focus:outline-none  focus:ring-gray-700 placeholder-gray-400 transition-all duration-300 shadow-md'
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className=" h-[50px] absolute inset-y-0 right-0 px-3 text-gray-500"
                                            tabIndex={-1}
                                        >
                                            {showConfirmPassword ? '🙈' : '👁️'}
                                        </button>
                                    </div>
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="div"
                                        className='text-red-500 text-sm font-semibold'
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
                                    {isSubmitting ? "PLEASE WAIT..." : "SIGN UP"}
                                </button>

                                <div className='mt-1'>
                                    <p className="font-futura text-[20px] text-gray-400">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-black hover:!text-red-500">
                                            Log In
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right side images */}
                        <div className="w-1/2 h-full flex flex-col justify-center items-center flex-wrap">
                            <div className="flex gap-[20px] ">
                                <div>
                                    <div className="shadow-xl shadow-gray-500/50 border-[2px] border-black mb-[20px]">
                                        <img src={SuImage1} className='w-[350px] h-[400px] object-cover' alt="" />
                                    </div>
                                    <div className="shadow-xl shadow-gray-500/50 border-[2px] border-black">
                                        <img src={SuImage2} className='w-[350px] h-[500px] object-cover' alt="" />
                                    </div>
                                </div>

                                <div>
                                    <div className="shadow-xl shadow-gray-500/50 border-[2px] border-black mb-[20px]">
                                        <img src={SuImage3} className='w-[350px] h-[450px] object-cover' alt="" />
                                    </div>
                                    <div className="shadow-xl shadow-gray-500/50 border-[2px] border-black">
                                        <img src={SuImage4} className='w-[350px] h-[450px] object-cover' alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignUp;
