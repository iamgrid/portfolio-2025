import * as css from "./style/index.css";

("use strict");
const HueChanger = {
	rootEl: document.documentElement,
	currentHue: 0,
	cycle: function () {
		this.currentHue = (this.currentHue + 0.5) % 360;
		this.rootEl.style.setProperty("--main-hue", this.currentHue);
	},
};

window.onload = () => {
	setInterval(() => {
		HueChanger.cycle();
	}, 50);
};
