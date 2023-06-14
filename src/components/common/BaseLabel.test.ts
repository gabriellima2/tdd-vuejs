import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import BaseLabel from "./BaseLabel.vue";

type Props = Pick<HTMLLabelElement, "htmlFor">;
type Slots = { text: string };

const mountComponent = (props?: Props, slots?: Slots) =>
	mount(BaseLabel, { props, slots: { default: slots ? slots.text : "default_label_text" } });

describe("<BaseLabel />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			const LABEL_TEXT = "any_label";
			const LABEL_HTML_FOR = "any_html_for";
			const component = mountComponent({ htmlFor: LABEL_HTML_FOR }, { text: LABEL_TEXT });

			expect(component.html()).toContain(LABEL_TEXT);
			expect(component.get(`[for=${LABEL_HTML_FOR}]`)).toBeTruthy();
		})
	});
});
