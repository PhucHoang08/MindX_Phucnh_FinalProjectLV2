import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../API/productAPI";

const EditProductModal = ({
    loadProducts,
    editingProduct,
    setEditingProduct,
    setShowEditModal,
    setIsLoading,
    isLoading,
}) => {
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        if (editingProduct?.images) {
            const joined = Array.isArray(editingProduct.images)
                ? editingProduct.images.join(", ")
                : editingProduct.images;
            handleImageChange(joined);
        }
    }, [editingProduct]);

    const validationSchema = Yup.object({
        id: Yup.string()
            .required("ID IS REQUIRED")
            .trim('NO LEADING OR TRAILING SPACES ALLOW')
            .test('no-spaces', 'MUST NOT CONTAIN SPACES!', value => !/\s/.test(value)),
        name: Yup.string().
            required("NAME PRODUCT IS REQUIRED")
            .trim('NO LEADING OR TRAILING SPACES ALLOW')
            .test("no-multiple-spaces", "MUST NOT CONTAIN MULTIPLE SPACES!", (value) => !/\s{2,}/.test(value)),
        description: Yup.string()
            .required("DESCRIPTION IS REQUIRED!")
            .trim("NO LEADING OR TRAILING SPACES ALLOWED")
            .test("no-multiple-spaces", "MUST NOT CONTAIN MULTIPLE SPACES!", (value) => !/\s{2,}/.test(value)),
        price: Yup.number()
            .positive("PRICE MUST BE GREATER THAN 0")
            .required("PRICE IS REQUIRED"),
        images: Yup.string()
            .required("IMAGE IS REQUIRED")
            .trim('NO LEADING OR TRAILING SPACES ALLOW')

    });

    const handleImageChange = (value) => {
        const urls = value.split(",").map((url) => url.trim()).filter((url) => url !== "");
        setImagePreviews(urls);
    };


    const getCurrentDate = () => {
        const date = new Date();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-70 z-50">
            <div className="bg-white p-6 rounded shadow-md w-1/2 space-y-4">
                <h2 className="text-xl font-futura ">EDIT PRODUCT</h2>

                <Formik
                    initialValues={{
                        id: editingProduct.id || "",
                        name: editingProduct.name || "",
                        description: editingProduct.description || "",
                        price: editingProduct.price || "",
                        images: Array.isArray(editingProduct.images) ? editingProduct.images.join(", ") : "",

                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, setSubmitting, resetForm) => {
                        setIsLoading(true);

                        try {
                            const currentResult = await fetchProducts();
                            let currentProducts = [];

                            if (Array.isArray(currentResult)) {
                                currentResult.forEach((item) => {
                                    if (item && item.data && Array.isArray(item.data)) {
                                        const validProducts = item.data.filter(
                                            (p) => p && typeof p === "object" && p.id && p.name
                                        );
                                        currentProducts = [...currentProducts, ...validProducts];
                                    }
                                });
                            }


                            const uniqueCurrentProducts = Array.from(new Map(currentProducts.map((p) => [p.id, p])).values());
                            const imagesArray = values.images.split(",").map((url) => url.trim());


                            const updatedProduct = {
                                id: values.id.trim(),
                                name: values.name.replace(/\s+/g, " ").trim(),
                                description: values.description.replace(/\s+/g, " ").trim(),
                                price: parseInt(values.price),
                                images: imagesArray,
                                date: getCurrentDate(), // MM/DD/YYYY format
                                status: "available",
                            };
                            const updatedProducts = uniqueCurrentProducts.map((product) =>
                                product.id === editingProduct.id ? updatedProduct : product
                            );


                            const response = await fetch(
                                "https://mindx-mockup-server.vercel.app/api/resources/dataProducts?apiKey=67fe688cc590d6933cc1248f",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ data: updatedProducts }),
                                }
                            );


                            if (!response.ok) {
                                const errorText = await response.text();
                                console.error("Server response status:", response.status);
                                console.error("Server response text:", errorText);
                                throw new Error(
                                    "Lỗi từ server: " + response.statusText + " - " + errorText
                                );
                            }


                            const result = await response.json();
                            console.log("Server response after update:", result);


                            await loadProducts();
                            setShowEditModal(false);
                            setImagePreviews([]);
                            setEditingProduct(null);
                        } catch (error) {
                            console.error("Lỗi khi chỉnh sửa sản phẩm:", error);
                            alert(`Chỉnh sửa thất bại: ${error.message}. Thử lại sau.`);
                        } finally {
                            setIsLoading(false);
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ values, handleChange }) => (
                        <Form className="space-y-4">
                            <div>
                                <Field
                                    type="text"
                                    name="id"
                                    placeholder="ID "
                                    className="w-full p-2 border rounded"
                                />
                                <ErrorMessage name="id" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Tên sản phẩm"
                                    className="w-full p-2 border rounded"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <Field
                                    type="text"
                                    name="images"
                                    placeholder="Image URLs (comma separated)"
                                    className="w-full p-2 border rounded"
                                    onChange={(e) => {
                                        handleChange(e);
                                        handleImageChange(e.target.value);
                                    }}
                                />
                                <ErrorMessage name="images" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {imagePreviews.map((src, idx) => (
                                    <img
                                        key={idx}
                                        src={src}
                                        alt={`preview-${idx}`}
                                        className="w-24 h-24 object-cover rounded"
                                        onError={(e) =>
                                            (e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found")
                                        }
                                    />
                                ))}
                            </div>
                            <div>
                                <Field
                                    type="number"
                                    name="price"
                                    placeholder="Price (USD)"
                                    className="w-full p-2 border rounded"
                                />
                                <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <Field
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    className="w-full p-2 border rounded" />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <input
                                type="text"
                                disabled
                                value={editingProduct.date}
                                className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
                            />

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setImagePreviews([]);
                                        setEditingProduct(null);
                                    }}
                                    className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 font-futura transition-all duration-300"
                                    disabled={isLoading}
                                >
                                    CANCEL
                                </button>

                                <button
                                    type="submit"
                                    className="relative bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 font-futura transition-all duration-300"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>

                                            ADDING...
                                        </span>
                                    ) : (
                                        "UPDATE"
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

export default EditProductModal;
