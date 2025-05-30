// Hàm bất đồng bộ để fetch danh sách tài khoản từ mock API
 const fetchUsers = async () => {
    try {
        const API_KEY = "67fe688cc590d6933cc1248f";
        const BASE_URL = `https://mindx-mockup-server.vercel.app/api/resources/dataUsers`;
        // Gọi API bằng phương thức GET đến endpoint mock với API key
        const response = await fetch(
            `${BASE_URL}?apiKey=${API_KEY}`
        );


        // Nếu phản hồi không thành công (status khác 200-299), ném lỗi
        if (!response.ok) throw new Error("Không thể lấy dữ liệu");


        // Parse phản hồi JSON thành JavaScript object
        const result = await response.json();


        // In kết quả thô từ API ra console để debug
        console.log("🐞 Raw result from API:", result);
        const customers = result?.data?.data;


        // Trả về mảng dữ liệu người dùng nằm trong result.data.data
        // Do mock API lồng dữ liệu như: { data: { data: [...] } }
        // Nếu là mảng thì trả về, nếu không thì trả về mảng rỗng để tránh lỗi
        return Array.isArray(customers) ? customers : [];
    } catch (error) {
        // Bắt lỗi nếu gọi API hoặc parse JSON thất bại
        console.error("Lỗi khi gọi API:", error);


        // Trả về mảng rỗng để tránh ứng dụng bị crash
        return [];
    }
};
export default fetchUsers
