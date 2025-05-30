import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../Header";
import Footer from "../Footer";

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

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
        address: Yup.string()
            .trim('NO LEADING OR TRAILING SPACES ALLOW')
            .required('ADDRESS IS REQUIRED!')
            .test(
                "no-multiple-spaces",
                "MUST NOT CONTAIN MULTIPLE SPACES!",
                (value) => !/\s{2,}/.test(value)
            ),
        phone: Yup.string()
            .trim('NO LEADING OR TRAILING SPACES ALLOW')
            .required("PHONE IS REQUIRED!")
            .matches(/^\d+$/, 'PHONE MUST CONTAIN ONLY NUMBERS!')
            .min(10, 'MUST BE AT LEAST 10 NUMBERS!')
            .max(10, 'MUST NOT BE MORE THAN 10 NUMBERS!')
            .test('no-spaces', 'MUST NOT CONTAIN SPACES!', value => !/\s/.test(value)),
    })
    if (!cartItems.length && !isLoading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-100 py-10">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
                            CHECKOUT
                        </h3>
                        <p className="text-center text-gray-600">CART IS EMPTY</p>
                        <button
                            onClick={() => navigate("/")}
                            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mx-auto block"
                        >
                            BACK
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen py-10 mt-[90px]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-futura text-gray-900 text-center mb-6">
                        CHECKOUT
                    </h3>
                    {isLoading ? (
                        <div className="text-center flex flex-col items-center justify-ceneter">
                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <p className="mt-2 text-gray-600">LOADING...</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-full bg-white ">
                                    <thead className="border-2 border-black">
                                        <tr>
                                            <th className="p-3 text-left text-lg font-semibold text-black font-futura">
                                                PRODUCT
                                            </th>
                                            <th className="p-3 text-left text-lg font-semibold text-black font-futura">
                                                PRICE
                                            </th>
                                            <th className="p-3 text-left text-lg font-semibold text-black font-futura">
                                                SIZE
                                            </th>
                                            <th className="p-3 text-left text-lg font-semibold text-black font-futura">
                                                QUANTITY
                                            </th>
                                            <th className="p-3 text-left text-lg font-semibold text-black font-futura">
                                                SUMMARY
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={`${item.id}-${index}`} className="hover:bg-gray-50 border-2 border-black">
                                                <td className="p-3 flex items-center space-x-3">
                                                    <img
                                                        src={item.images[0] || "https://via.placeholder.com/50"}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded"
                                                        onError={(e) =>
                                                            (e.target.src = "https://via.placeholder.com/50?text=Image+Not+Found")
                                                        }
                                                    />
                                                    <span className="font-futura text-lg">{item.name}</span>
                                                </td>
                                                <td className="p-3 text-lg text-gray-900 font-futura">
                                                    PRICE: $ {item.price} USD
                                                </td>
                                                <td className="p-3 text-lg text-gray-900 font-futura">
                                                    SIZE: {item.size}
                                                </td>
                                                <td className="p-3 text-lg text-gray-900 font-futura">
                                                    {item.quantity}
                                                </td>
                                                <td className="p-3 text-lg text-gray-900 font-futura">
                                                    $ {item.price * item.quantity} USD
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Formik Form */}
                            <Formik
                                initialValues={{
                                    fullName: "",
                                    address: "",
                                    email: "",
                                    phone: ""
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    setIsLoading(true);
                                    setTimeout(() => {
                                        alert("CHECKOUT SUCCESS!");
                                        localStorage.removeItem("cart");
                                        setCartItems([]);
                                        navigate("/");
                                        setIsLoading(false);
                                    }, 3000);
                                }}
                            >
                                <Form className=" shadow-lg p-6 border-2 border-black">
                                    <h4 className="text-xl font-futura text-gray-900 mb-4">
                                        INFORMATION
                                    </h4>

                                    <div className="mb-4 w-full flex flex-row items-center gap-12 ">

                                        <div className="w-1/2">
                                            <Field
                                                type="text"
                                                name="fullName"
                                                placeholder="Full name"
                                                className="w-full p-2 border rounded"
                                            />
                                            <ErrorMessage
                                                name="fullName"
                                                component="p"
                                                className="text-red-500  text-sm mt-1 font-futura"

                                            />
                                        </div>

                                        <div className="w-1/2">
                                            <Field
                                                type="text"
                                                name="address"
                                                placeholder="Address"
                                                className="w-full p-2 border rounded"
                                            />
                                            <ErrorMessage
                                                name="address"
                                                component="p"
                                                className="text-red-500  text-sm mt-1 font-futura"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4 w-full flex flex-row items-center gap-12 ">
                                        <div className="w-1/2">
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                className="w-full p-2 border rounded"
                                            />
                                            <ErrorMessage
                                                name="phone"
                                                component="p"
                                                className="text-red-500  text-sm mt-1 font-futura"
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <Field
                                                type="text"
                                                name="phone"
                                                placeholder="Phone"
                                                className="w-full p-2 border rounded"
                                            />
                                            <ErrorMessage
                                                name="phone"
                                                component="p"
                                                className="text-red-500  text-sm mt-1 font-futura"
                                            />
                                        </div>

                                    </div>

                                    <div className="text-right">
                                        <p className="text-xl mb-4 font-futura">
                                            TOTAL: $ {getTotal()} USD
                                        </p>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 font-futura text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                        >
                                            ACCESS CHECKOUT
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
