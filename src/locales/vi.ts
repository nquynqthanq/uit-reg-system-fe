/**
 * Vietnamese Translations
 */

export const vi = {
	// Common
	common: {
		appName: "UIT-Regulations",
		search: "Tìm kiếm",
		cancel: "Hủy",
		save: "Lưu",
		delete: "Xóa",
		edit: "Chỉnh sửa",
		close: "Đóng",
		submit: "Gửi",
		loading: "Đang tải...",
	},

	// Navigation
	nav: {
		home: "Trang chủ",
		history: "Lịch sử",
		settings: "Cài đặt",
		newChat: "Cuộc trò chuyện mới",
	},

	// Auth
	auth: {
		signIn: "Đăng nhập",
		signUp: "Đăng ký",
		signOut: "Đăng xuất",
		email: "Email",
		password: "Mật khẩu",
		confirmPassword: "Xác nhận mật khẩu",
		name: "Họ và tên",
		forgotPassword: "Quên mật khẩu?",
		dontHaveAccount: "Chưa có tài khoản?",
		alreadyHaveAccount: "Đã có tài khoản?",
		signInWithGoogle: "Đăng nhập bằng Google",
		signUpWithGoogle: "Đăng ký bằng Google",
		welcomeBack: "Chào mừng trở lại!",
		createAccount: "Tạo tài khoản",
		loginSuccess: "Đăng nhập thành công!",
		signupSuccess: "Đăng ký thành công!",
		logoutSuccess: "Đăng xuất thành công!",
	},

	// Validation
	validation: {
		required: "Trường này là bắt buộc",
		invalidEmail: "Email không hợp lệ",
		passwordTooShort: "Mật khẩu phải có ít nhất 8 ký tự",
		passwordMismatch: "Mật khẩu không khớp",
		invalidCredentials: "Email hoặc mật khẩu không đúng",
	},

	// Chat
	chat: {
		inputPlaceholder: "Nhập câu hỏi của bạn...",
		newChat: "Cuộc trò chuyện mới",
		searchHistory: "Tìm kiếm lịch sử...",
		noHistory: "Chưa có lịch sử trò chuyện",
		today: "Hôm nay",
		yesterday: "Hôm qua",
		last7Days: "7 ngày trước",
		last30Days: "30 ngày trước",
		older: "Cũ hơn",
		deleteChat: "Xóa cuộc trò chuyện",
		deleteChatConfirm: "Bạn có chắc chắn muốn xóa cuộc trò chuyện này?",
		emptyChat: "Bắt đầu cuộc trò chuyện mới",
		emptyState: "Hỏi tôi bất cứ điều gì về quy định của UIT!",
	},

	// Settings
	settings: {
		title: "Cài đặt",
		theme: "Giao diện",
		language: "Ngôn ngữ",
		lightMode: "Sáng",
		darkMode: "Tối",
		vietnamese: "Tiếng Việt",
		english: "English",
		account: "Tài khoản",
		profile: "Hồ sơ",
		preferences: "Tùy chọn",
	},

	// User Menu
	user: {
		profile: "Hồ sơ",
		settings: "Cài đặt",
		signOut: "Đăng xuất",
	},

	// Errors
	error: {
		generic: "Đã xảy ra lỗi. Vui lòng thử lại.",
		network: "Lỗi kết nối. Vui lòng kiểm tra internet của bạn.",
		notFound: "Không tìm thấy trang",
		unauthorized: "Bạn không có quyền truy cập",
		serverError: "Lỗi máy chủ. Vui lòng thử lại sau.",
	},

	// Placeholders
	placeholder: {
		email: "example@uit.edu.vn",
		name: "Nguyễn Văn A",
		search: "Tìm kiếm...",
	},
};

export type TranslationKeys = typeof vi;
