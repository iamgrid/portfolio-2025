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

window.milestones = {
	VIEW_IDS: {
		DEV: "DEV",
		DESIGN: "DESIGN",
	},
	selectedView: "DEV",
	selectView: function (viewId) {
		const functionSignature = "index.js@selectView()";

		console.log(functionSignature, { viewId, selectedView: this.selectedView });

		if (viewId === milestones.selectedView) {
			console.log(
				functionSignature,
				"No change in active view, returning early..."
			);
			return;
		}
		if (!(viewId in milestones.VIEW_IDS)) {
			throw new Error(`Invalid viewId: ${viewId}`);
		}

		document
			.getElementById(`milestones__${milestones.selectedView}`)
			.classList.remove("milestones__view--active");
		document.getElementById(
			`milestones__${milestones.selectedView}-radio`
		).ariaChecked = false;

		document
			.getElementById(`milestones__${viewId}`)
			.classList.add("milestones__view--active");

		document.getElementById(`milestones__${viewId}-radio`).ariaChecked = true;

		milestones.selectedView = milestones.VIEW_IDS[viewId];
	},
};
