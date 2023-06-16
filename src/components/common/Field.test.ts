import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Field, { type FieldProps } from "./Field.vue";

type Props = Omit<FieldProps, "modelValue">

const DEFAULT_PROPS: Props = {
	input: {
		type: "text",
		id: "any_input_id",
		name: "any_input_name",
	},
	error: {
		id: "any_error_id",
		message: null,
	},
	labelText: "any_label_text"
}

const mountComponent = (props: Props) => {
	const mountedComponent = mount(Field, {
		props: {
			...props,
			modelValue: "",
			'onUpdate:modelValue': (value: string) => mountedComponent.setProps({ modelValue: value }),
		}
	});
	return mountedComponent;
}

describe("<Field />", () => {
	describe("Render", () => {
		it("should render correctly without error", () => {
			const component = mountComponent(DEFAULT_PROPS);
			const { input, error, labelText } = DEFAULT_PROPS;
			const labelEl = component.get(`[for=${input.id}]`);
			const inputEl = component.get(`[id=${input.id}]`);
			const errorEl = component.find(`[id=${error.id}]`);

			expect(labelEl.text()).toContain(labelText);
			expect(inputEl.element.getAttribute("type")).toBe("text");
			expect(inputEl.element.getAttribute("name")).toBe(input.name);
			expect(inputEl.element.getAttribute("aria-invalid")).toBe("false");
			expect(errorEl.exists()).toBeFalsy();
		});
		it("should render correctly with error", () => {
			const ERROR_MESSAGE = "any_error";
			const component = mountComponent({ ...DEFAULT_PROPS, error: { ...DEFAULT_PROPS.error, message: ERROR_MESSAGE } });
			const { input, error, labelText } = DEFAULT_PROPS;
			const labelEl = component.get(`[for=${input.id}]`);
			const inputEl = component.get(`[id=${input.id}]`);
			const errorEl = component.get(`[id=${error.id}]`);

			expect(labelEl.text()).toContain(labelText);
			expect(inputEl.element.getAttribute("type")).toBe("text");
			expect(inputEl.element.getAttribute("name")).toBe(input.name);
			expect(inputEl.element.getAttribute("aria-invalid")).toBe("true");
			expect(errorEl.text()).toBe(ERROR_MESSAGE);
		});
	});
	describe("Interactions", () => {
		describe("Typing", () => {
			it("should get and show the typed value", async () => {
				const TYPED_VALUE = "any_value";
				const component = mountComponent(DEFAULT_PROPS);
				const { input } = DEFAULT_PROPS;
				const inputEl = component.get(`[id=${input.id}]`);

				await inputEl.setValue(TYPED_VALUE);

				expect(component.props("modelValue")).toBe(TYPED_VALUE);
			});
		});
	});
});
