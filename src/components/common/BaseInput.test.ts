import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { InputHTMLAttributes } from "vue";

import BaseInput from "./BaseInput.vue";

type Props = InputHTMLAttributes

const mountComponent = (props?: Props) => {
	const mountedComponent = mount(BaseInput, {
		props: {
			...props,
			modelValue: "",
			'onUpdate:modelValue': (value: string) => mountedComponent.setProps({ modelValue: value }),
		}
	});
	return mountedComponent;
}

describe("<BaseInput />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			const INPUT_PLACEHOLDER = "any_placeholder";
			const INPUT_NAME = "any_name";
			const component = mountComponent({ name: INPUT_NAME, placeholder: INPUT_PLACEHOLDER });

			expect(component.get('[type="text"]')).toBeTruthy();
			expect(component.get(`[placeholder=${INPUT_PLACEHOLDER}`)).toBeTruthy();
			expect(component.get(`[name=${INPUT_NAME}`)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Typing", () => {
			it("should get and show the typed value", async () => {
				const TYPED_VALUE = "any_value";
				const component = mountComponent();

				await component.setValue(TYPED_VALUE);

				expect(component.props("modelValue")).toBe(TYPED_VALUE)
			})
		})
	})
});
