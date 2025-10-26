/**
 * Locales Index
 */

import { vi } from "./vi";
import { en } from "./en";

export const translations = {
	vi,
	en,
};

export type Language = keyof typeof translations;

export { vi, en };
