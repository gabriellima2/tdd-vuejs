import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import BaseError, { type BaseErrorProps } from "./BaseError.vue";

const ERROR_MESSAGE = "any_message";

const mountComponent = (props: BaseErrorProps) => mount(BaseError, { props });

describe("<BaseError />", () => {
	describe("Render", () => {
		it("should render correctly with error message", () => {
			const component = mountComponent({ message: ERROR_MESSAGE });
			const errorEl = component.get('[role="alert"]');

			expect(errorEl.text()).toContain(ERROR_MESSAGE);
		 	expect(errorEl.isVisible()).toBeTruthy();
		});
		it("should render correctly without error message", () => {
			const component = mountComponent({ message: null });
			const errorEl = component.find('[role="alert"]');

			expect(errorEl.exists()).toBeFalsy();
		});
	});
});
