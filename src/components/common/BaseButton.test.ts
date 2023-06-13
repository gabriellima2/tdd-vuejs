import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { ButtonHTMLAttributes } from "vue";

import BaseButton from "./BaseButton.vue";

type Props = ButtonHTMLAttributes;

const BUTTON_TEXT = "any_text";
const BUTTON_TITLE = "any_title";
const DISABLED_CLASS = "base-button--disabled"
const mountComponent = (props?: Props) => mount(BaseButton, { props, slots: { default: BUTTON_TEXT } });

describe("<BaseButton />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			const component = mountComponent({ type: "submit", title: BUTTON_TITLE });

			expect(component.html()).toContain(BUTTON_TEXT);
			expect(component.get('[type="submit"')).toBeTruthy();
			expect(component.get(`[title=${BUTTON_TITLE}`)).toBeTruthy();
			expect(component.classes().some((elClass) => elClass === DISABLED_CLASS)).toBeFalsy()
		});
		it("should render correctly when disabled is true", () => {
			const component = mountComponent({ type: "submit", title: BUTTON_TITLE, disabled: true });

			expect(component.html()).toContain(BUTTON_TEXT);
			expect(component.get('[type="submit"')).toBeTruthy();
			expect(component.get(`[title=${BUTTON_TITLE}`)).toBeTruthy();
			expect(component.classes().some((elClass) => elClass === DISABLED_CLASS)).toBeTruthy()
		});
	});
});
