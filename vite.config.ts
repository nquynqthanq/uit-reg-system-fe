import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({
			svgrOptions: {
				exportType: "default",
				ref: true,
				svgo: false,
				titleProp: true,
			},
			include: "**/*.svg?react",
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@constants": path.resolve(__dirname, "./src/constants"),
			"@contexts": path.resolve(__dirname, "./src/contexts"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@locales": path.resolve(__dirname, "./src/locales"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@store": path.resolve(__dirname, "./src/store"),
			"@types": path.resolve(__dirname, "./src/types"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
});
