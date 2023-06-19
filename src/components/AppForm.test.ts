import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import AppForm from "./AppForm.vue";

const mountComponent = () => mount(AppForm);

describe("<AppForm />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			const component = mountComponent();
			const html = component.html();

			expect(html).toContain("Email");
			expect(component.get('[type="email"]')).toBeTruthy();
			expect(component.get('[placeholder="ex: your_name@domain.com"]')).toBeTruthy();
			expect(html).toContain("Senha");
			expect(component.get('[type="password"]')).toBeTruthy();
			expect(component.get('[placeholder="8 ou mais caracteres"]')).toBeTruthy();
			expect(component.get('[type="submit"]')).toBeTruthy();
			expect(component.get('[title="Pronto!"]')).toBeTruthy();
			expect(html).toContain("Pronto!");
		});
	});
});
