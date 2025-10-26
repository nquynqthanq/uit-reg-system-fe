/// <reference types="vite/client" />

// Existing interfaces...
interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string;
	readonly VITE_API_TIMEOUT: string;
	readonly VITE_APP_NAME: string;
	readonly VITE_APP_VERSION: string;
	readonly VITE_ENV: string;
	readonly VITE_ENABLE_DEBUG: string;
	readonly VITE_ENABLE_ANALYTICS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

// Add these SVG declarations:
declare module "*.svg" {
	const content: string;
	export default content;
}

declare module "*.svg?react" {
	import { FC, SVGProps } from "react";
	const content: FC<SVGProps<SVGSVGElement>>;
	export default content;
}
