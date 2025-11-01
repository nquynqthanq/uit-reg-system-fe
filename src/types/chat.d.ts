/**
 * Chat Types
 */

type Message = {
	id: string;
	text: string;
	timestamp: Date;
	sender: "user" | "assistant";
};

type ChatSession = {
	id: string;
	title: string;
	messages: Message[];
	createdAt: Date;
	updatedAt: Date;
};

type ChatContextType = {
	currentChat: ChatSession | null;
	chatHistory: ChatSession[];
	isLoading: boolean;
	createNewChat: () => void;
	selectChat: (chatId: string) => void;
	sendMessage: (message: string) => Promise<void>;
	deleteChat: (chatId: string) => void;
	searchHistory: (query: string) => ChatSession[];
};
