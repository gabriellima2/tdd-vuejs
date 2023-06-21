import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";

import AppForm from "./AppForm.vue";

const handleSubmitFn = vi.fn();
const mountComponent = () => mount(AppForm, { props: { handleSubmit: handleSubmitFn } });

describe("<AppForm />", () => {
	const EMAIL_FIELD_SELECTOR = '[type="email"]';
	const PASSWORD_FIELD_SELECTOR = '[type="password"]';
	const SUBMIT_BTN_SELECTOR = '[type="submit"]';
	const EMAIL_ERROR_SELECTOR = '[id="email_error"]';
	const PASSWORD_ERROR_SELECTOR = '[id="password_error"]';

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("Render", () => {
		it("should render correctly", () => {
			const component = mountComponent();
			const html = component.html();

			expect(html).toContain("Email");
			expect(component.get(EMAIL_FIELD_SELECTOR)).toBeTruthy();
			expect(component.get('[placeholder="ex: your_name@domain.com"]')).toBeTruthy();
			expect(html).toContain("Senha");
			expect(component.get(PASSWORD_FIELD_SELECTOR)).toBeTruthy();
			expect(component.get('[placeholder="8 ou mais caracteres"]')).toBeTruthy();
			expect(component.get(SUBMIT_BTN_SELECTOR)).toBeTruthy();
			expect(component.get('[title="Pronto!"]')).toBeTruthy();
			expect(html).toContain("Pronto!");
		});
	});
	describe("Interactions", () => {
		describe("Submit", () => {
			it("should call submit function passed in props when submitting", async () => {
				const component = mountComponent();
				const passwordField = component.get(PASSWORD_FIELD_SELECTOR);
				const emailField = component.get(EMAIL_FIELD_SELECTOR);
				const values = { email: "any@email.com", password: "12345678" };

				await emailField.setValue(values.email);
				await passwordField.setValue(values.password);
				await component.get(SUBMIT_BTN_SELECTOR).trigger("submit");

				expect(handleSubmitFn).toHaveBeenCalledWith(values);
			});
		});
	});
	describe("Validation", () => {
		describe("Required", () => {
			const EXPECTED_MESSAGE_SNIPPET = "obrigatório";
			it("should throw an error when email field is empty", async () => {
				const component = mountComponent();
				const passwordField = component.get(PASSWORD_FIELD_SELECTOR)

				await passwordField.setValue("any_password");
				await component.get(SUBMIT_BTN_SELECTOR).trigger("submit");
				const emailErrorEl = component.get(EMAIL_ERROR_SELECTOR);

				expect(emailErrorEl).toBeTruthy()
				expect(emailErrorEl.text().toLowerCase()).toContain(EXPECTED_MESSAGE_SNIPPET);
				expect(component.find(PASSWORD_ERROR_SELECTOR).exists()).toBeFalsy();
				expect(handleSubmitFn).not.toHaveBeenCalled();
			});
			it("should throw an error when password field is empty", async () => {
				const component = mountComponent();
				const emailField = component.get(EMAIL_FIELD_SELECTOR)

				await emailField.setValue("any@email.com");
				await component.get(SUBMIT_BTN_SELECTOR).trigger("submit");
				const passwordErrorEl = component.get(PASSWORD_ERROR_SELECTOR);

				expect(passwordErrorEl).toBeTruthy()
				expect(passwordErrorEl.text().toLowerCase()).toContain(EXPECTED_MESSAGE_SNIPPET);
				expect(component.find(EMAIL_ERROR_SELECTOR).exists()).toBeFalsy();
				expect(handleSubmitFn).not.toHaveBeenCalled();
			});
			it("should throw an error when both fields are empty", async () => {
				const component = mountComponent();

				await component.get(SUBMIT_BTN_SELECTOR).trigger("submit");
				const emailErrorEl = component.get(EMAIL_ERROR_SELECTOR);
				const passwordErrorEl = component.get(PASSWORD_ERROR_SELECTOR);

				expect(emailErrorEl).toBeTruthy();
				expect(emailErrorEl.text()).toContain(EXPECTED_MESSAGE_SNIPPET);
				expect(passwordErrorEl).toBeTruthy();
				expect(passwordErrorEl.text().toLowerCase()).toContain(EXPECTED_MESSAGE_SNIPPET);
				expect(handleSubmitFn).not.toHaveBeenCalled();
			});
		});
		describe("Invalid values", () => {
			const EXPECTED_MESSAGE_SNIPPET = "inválido";
			it("should throw an error when the email field has an invalid format", async () => {
				const component = mountComponent();
				const emailField = component.get(EMAIL_FIELD_SELECTOR);
				const INVALID_VALUE = "anyemail.com"

				await emailField.setValue(INVALID_VALUE);
				await component.get(SUBMIT_BTN_SELECTOR).trigger("submit");
				const emailErrorEl = component.get(EMAIL_ERROR_SELECTOR);

				expect(emailErrorEl).toBeTruthy();
				expect(emailErrorEl.text().toLowerCase()).toContain(EXPECTED_MESSAGE_SNIPPET);
				expect(handleSubmitFn).not.toHaveBeenCalled();
			});
			it("should throw an error when the email field has a value greater than 256 chars", async () => {
				const component = mountComponent();
				const emailField = component.get(EMAIL_FIELD_SELECTOR);
				const INVALID_VALUE = "emailloremipsumdolorsitametconsecteturadipiscingelit,temporincididuntutlaboreetdoloremagnaaliqua.Utenimadminimveniam,quisnostrudexercitationullamcolaborisnisiutaliquipexeacommodoconsequat.Duisauteiruredolorinreprehenderitinvoluptatevelitessecillumdoloreeufugiatnullapariatur@any.com";

				await emailField.setValue(INVALID_VALUE);
				await component.get(SUBMIT_BTN_SELECTOR).trigger("submit");
				const emailErrorEl = component.get(EMAIL_ERROR_SELECTOR);

				expect(emailErrorEl).toBeTruthy();
				expect(emailErrorEl.text().toLowerCase()).toContain(EXPECTED_MESSAGE_SNIPPET);
				expect(handleSubmitFn).not.toHaveBeenCalled();
			});
			it("should throw an error when the password field has a value less than 8 chars", async () => {
				const component = mountComponent();
				const passwordField = component.get(PASSWORD_FIELD_SELECTOR);
				const INVALID_VALUE = "123456";

				await passwordField.setValue(INVALID_VALUE);
				await component.get(SUBMIT_BTN_SELECTOR).trigger("submit");
				const passwordErrorEl = component.get(PASSWORD_ERROR_SELECTOR);

				expect(passwordErrorEl).toBeTruthy();
				expect(passwordErrorEl.text().toLowerCase()).toContain(EXPECTED_MESSAGE_SNIPPET);
				expect(handleSubmitFn).not.toHaveBeenCalled();
			});
			it("should throw an error when the password field has a value greater than 50 chars", async () => {
				const component = mountComponent();
				const passwordField = component.get(PASSWORD_FIELD_SELECTOR);
				const INVALID_VALUE = "loremipsumdolorsitametconsecteturadipiscingelittemporincididuntutlaboreetdoloremagnaaliqua";

				await passwordField.setValue(INVALID_VALUE);
				await component.get(SUBMIT_BTN_SELECTOR).trigger("submit");
				const passwordErrorEl = component.get(PASSWORD_ERROR_SELECTOR);

				expect(passwordErrorEl).toBeTruthy();
				expect(passwordErrorEl.text().toLowerCase()).toContain(EXPECTED_MESSAGE_SNIPPET);
				expect(handleSubmitFn).not.toHaveBeenCalled();
			});
		});
	});
});
