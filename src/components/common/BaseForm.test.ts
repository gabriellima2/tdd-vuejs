import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import BaseForm, { BaseFormProps } from "./BaseForm.vue";

const FIELDS_SLOT = "<p>any_children</p>";
const DEFAULT_PROPS: BaseFormProps = {
	buttonText: "any_text",
	onSubmit: vi.fn(),
}

const mountComponent = () => mount(BaseForm as any, {
	props: DEFAULT_PROPS, slots: { default: FIELDS_SLOT }
});

describe("<BaseForm />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			const component = mountComponent();

			expect(component.html()).toContain(FIELDS_SLOT);
			expect(component.get('[type="submit"]')).toBeTruthy();
			expect(component.html()).toContain(DEFAULT_PROPS.buttonText);
		});
	});
	describe("Interactions", () => {
		describe("Submit", () => {
			it("should call onSubmit function when submitted", async () => {
				const component = mountComponent();

				const button = component.get('[type="submit"]');
				await button.trigger("submit");

				expect(DEFAULT_PROPS.onSubmit).toHaveBeenCalledTimes(1);
			});
		});
	});
});
