import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
	useEffect,
} from "react";

interface ChatContextType {
	currentChat: ChatSession | null;
	chatHistory: ChatSession[];
	isLoading: boolean;
	createNewChat: () => void;
	selectChat: (chatId: string) => void;
	sendMessage: (message: string) => Promise<void>;
	deleteChat: (chatId: string) => void;
	clearAllChats: () => void;
	searchHistory: (query: string) => ChatSession[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [currentChat, setCurrentChat] = useState<ChatSession | null>(null);
	const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	// Load chat history from localStorage on mount
	useEffect(() => {
		const savedHistory = localStorage.getItem("chatHistory");
		if (savedHistory) {
			try {
				const parsed = JSON.parse(savedHistory);
				// Convert date strings back to Date objects
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const history = parsed.map((chat: any) => ({
					...chat,
					createdAt: new Date(chat.createdAt),
					updatedAt: new Date(chat.updatedAt),
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					messages: chat.messages.map((msg: any) => ({
						...msg,
						timestamp: new Date(msg.timestamp),
					})),
				}));
				setChatHistory(history);
			} catch (error) {
				console.error("Error parsing chat history:", error);
			}
		}
	}, []);

	// Save chat history to localStorage whenever it changes
	useEffect(() => {
		if (chatHistory.length > 0) {
			localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
		}
	}, [chatHistory]);

	const createNewChat = useCallback(() => {
		const newChat: ChatSession = {
			id: Date.now().toString(),
			title: "Cuộc trò chuyện mới",
			messages: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		setCurrentChat(newChat);
		setChatHistory((prev) => [newChat, ...prev]);
	}, []);

	const selectChat = useCallback(
		(chatId: string) => {
			const chat = chatHistory.find((c) => c.id === chatId);
			if (chat) {
				setCurrentChat(chat);
			}
		},
		[chatHistory]
	);

	const sendMessage = useCallback(
		async (messageText: string) => {
			if (!currentChat) {
				createNewChat();
				// Wait for state update
				await new Promise((resolve) => setTimeout(resolve, 0));
			}

			setIsLoading(true);

			try {
				// Create user message
				const userMessage: Message = {
					id: Date.now().toString(),
					text: messageText,
					timestamp: new Date(),
					sender: "user",
				};

				// Update current chat with user message
				const updatedChat: ChatSession = {
					...(currentChat || {
						id: Date.now().toString(),
						title: messageText.substring(0, 50),
						messages: [],
						createdAt: new Date(),
						updatedAt: new Date(),
					}),
					messages: [...(currentChat?.messages || []), userMessage],
					title:
						currentChat?.messages.length === 0
							? messageText.substring(0, 50)
							: currentChat?.title || messageText.substring(0, 50),
					updatedAt: new Date(),
				};

				setCurrentChat(updatedChat);

				// Update chat history
				setChatHistory((prev) => {
					const index = prev.findIndex((c) => c.id === updatedChat.id);
					if (index >= 0) {
						const newHistory = [...prev];
						newHistory[index] = updatedChat;
						return newHistory;
					}
					return [updatedChat, ...prev];
				});

				// Simulate AI response
				await new Promise((resolve) => setTimeout(resolve, 2000));

				const assistantMessage: Message = {
					id: (Date.now() + 1).toString(),
					text: "Đây là câu trả lời mô phỏng từ trợ lý AI. Tôi có thể giúp bạn tìm hiểu về các quy định của UIT.",
					timestamp: new Date(),
					sender: "assistant",
				};

				const finalChat: ChatSession = {
					...updatedChat,
					messages: [...updatedChat.messages, assistantMessage],
					updatedAt: new Date(),
				};

				setCurrentChat(finalChat);

				// Update chat history again
				setChatHistory((prev) => {
					const index = prev.findIndex((c) => c.id === finalChat.id);
					if (index >= 0) {
						const newHistory = [...prev];
						newHistory[index] = finalChat;
						return newHistory;
					}
					return [finalChat, ...prev];
				});
			} catch (error) {
				console.error("Error sending message:", error);
			} finally {
				setIsLoading(false);
			}
		},
		[currentChat, createNewChat]
	);

	const deleteChat = useCallback((chatId: string) => {
		setChatHistory((prev) => prev.filter((c) => c.id !== chatId));
		setCurrentChat((current) => (current?.id === chatId ? null : current));
	}, []);

	const clearAllChats = useCallback(() => {
		setChatHistory([]);
		setCurrentChat(null);
		localStorage.removeItem("chatHistory");
	}, []);

	const searchHistory = useCallback(
		(query: string): ChatSession[] => {
			if (!query.trim()) return chatHistory;

			const lowerQuery = query.toLowerCase();
			return chatHistory.filter(
				(chat) =>
					chat.title.toLowerCase().includes(lowerQuery) ||
					chat.messages.some((msg) => msg.text.toLowerCase().includes(lowerQuery))
			);
		},
		[chatHistory]
	);

	return (
		<ChatContext.Provider
			value={{
				currentChat,
				chatHistory,
				isLoading,
				createNewChat,
				selectChat,
				sendMessage,
				deleteChat,
				clearAllChats,
				searchHistory,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = (): ChatContextType => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error("useChat must be used within a ChatProvider");
	}
	return context;
};
