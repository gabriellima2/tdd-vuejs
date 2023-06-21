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
	describe("Validation", () => {
		const EMAIL_ERROR_SELECTOR = '[id="email_error"]';
		const PASSWORD_ERROR_SELECTOR = '[id="password_error"]';
		const SUBMIT_BTN_SELECTOR = '[type="submit"]';

		describe("Required", () => {
			const EXPECTED_MESSAGE_SNIPPET = "obrigatório";
			it("should throw an error when email field is empty", async () => {
				const component = mountComponent();
				const passwordField = component.get('[type="password"]')

				await passwordField.setValue("any_password");
				await component.get(SUBMIT_BTN_SELECTOR).trigger("submit");
				const emailErrorEl = component.get(EMAIL_ERROR_SELECTOR);

				expect(emailErrorEl).toBeTruthy()
				expect(emailErrorEl.text()).toContain(EXPECTED_MESSAGE_SNIPPET);
				expect(component.find(PASSWORD_ERROR_SELECTOR).exists()).toBeFalsy();
			});
			it("should throw an error when password field is empty", async () => {
				const component = mountComponent();
				const emailField = component.get('[type="email"]')

				await emailField.setValue("any@email.com");
				await component.get(SUBMIT_BTN_SELECTOR).trigger("submit");
				const passwordErrorEl = component.get(PASSWORD_ERROR_SELECTOR);

				expect(passwordErrorEl).toBeTruthy()
				expect(passwordErrorEl.text()).toContain(EXPECTED_MESSAGE_SNIPPET);
				expect(component.find(EMAIL_ERROR_SELECTOR).exists()).toBeFalsy();
			});
			it("should throw an error when both fields are empty", async () => {
				const component = mountComponent();

				await component.get(SUBMIT_BTN_SELECTOR).trigger("submit");
				const emailErrorEl = component.get(EMAIL_ERROR_SELECTOR);
				const passwordErrorEl = component.get(PASSWORD_ERROR_SELECTOR);

				expect(emailErrorEl).toBeTruthy();
				expect(emailErrorEl.text()).toContain(EXPECTED_MESSAGE_SNIPPET);
				expect(passwordErrorEl).toBeTruthy();
				expect(passwordErrorEl.text()).toContain(EXPECTED_MESSAGE_SNIPPET);
			});
		});
	});
});