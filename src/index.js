import * as css from "./index.css";

("use strict");
const IAG = {
	hueChanger: {
		animate: true,
		rootEl: document.documentElement,
		toggleButtonEl: document.getElementById("toggle-bg-animation"),
		currentHue: 175,
		cycle: function () {
			if (!this.animate) return;
			this.currentHue = (this.currentHue + 0.5) % 360;
			this.rootEl.style.setProperty("--main-hue", this.currentHue);
		},
		toggleAnimation: function () {
			const newState = !this.animate;
			this.animate = newState;

			localStorage.setItem("bgAnimation", newState ? "on" : "off");
			localStorage.setItem("bgAnimationStoppedAtHue", this.currentHue);

			this.updateToggleButtonState();
		},
		updateToggleButtonState: function () {
			this.toggleButtonEl.ariaChecked = this.animate;
			this.toggleButtonEl.title = this.animate
				? "Background Animation is on"
				: "Background Animation is off";
		},
		init: function () {
			if (localStorage.getItem("bgAnimation") === "off") {
				this.animate = false;
				this.updateToggleButtonState();

				if (localStorage.getItem("bgAnimationStoppedAtHue")) {
					this.currentHue = parseFloat(
						localStorage.getItem("bgAnimationStoppedAtHue")
					);
					this.rootEl.style.setProperty("--main-hue", this.currentHue);
				}
			}

			setInterval(() => {
				IAG.hueChanger.cycle();
			}, 50);
		},
	},
	milestones: {
		VIEW_IDS: {
			DEV: "DEV",
			DESIGN: "DESIGN",
		},
		selectedView: "DEV",
		selectView: function (viewId) {
			const functionSignature = "index.js@milestones.selectView()";

			console.log(functionSignature, {
				viewId,
				selectedView: this.selectedView,
			});

			if (viewId === this.selectedView) {
				console.log(
					functionSignature,
					"No change in active view, returning early..."
				);
				return;
			}
			if (!(viewId in this.VIEW_IDS)) {
				throw new Error(`Invalid viewId: ${viewId}`);
			}

			document
				.getElementById(`milestones__${this.selectedView}`)
				.classList.remove("milestones__view--active");
			document.getElementById(
				`milestones__${this.selectedView}-radio`
			).ariaChecked = false;

			document
				.getElementById(`milestones__${viewId}`)
				.classList.add("milestones__view--active");

			document.getElementById(`milestones__${viewId}-radio`).ariaChecked = true;

			this.selectedView = this.VIEW_IDS[viewId];
		},
	},
	scrollToSection: function (sectionId) {
		const functionSignature = "index.js@scrollToSection()";
		console.log(functionSignature, { sectionId });

		const sectionEl = document.getElementById(sectionId);
		if (!sectionEl) {
			throw new Error(`No section found with ID: ${sectionId}`);
		}

		sectionEl.scrollIntoView({ behavior: "smooth" });
		window.history.pushState(null, "", `#${sectionId}`);
	},
	copyEmailToClipboard: function () {
		const functionSignature = "index.js@copyEmailToClipboard()";
		console.log(functionSignature);
		const email = "andy@iamgrid.co.uk";
		navigator.clipboard
			.writeText(email)
			.then(() => {
				alert(`My email address (${email}) was copied to your clipboard.`);
			})
			.catch((err) => {
				console.error("Failed to copy text to clipboard: ", err);
			});
	},
	backToTopLinkIsVisible: false,
	showHideBackToTopLink: function () {
		const topLinkEl = document.getElementById("top-link");
		if (window.scrollY > 100) {
			if (!IAG.backToTopLinkIsVisible) {
				topLinkEl.style.display = "grid";
				IAG.backToTopLinkIsVisible = true;
				setTimeout(() => {
					topLinkEl.style.opacity = "0.5";
				}, 100);
			}
		} else {
			if (IAG.backToTopLinkIsVisible) {
				topLinkEl.style.opacity = "0";
				setTimeout(() => {
					topLinkEl.style.display = "none";
					IAG.backToTopLinkIsVisible = false;
				}, 400);
			}
		}
	},
};

window.onload = () => {
	IAG.hueChanger.init();

	// add scroll event listener to show/hide "back to top" link
	window.addEventListener("scroll", IAG.showHideBackToTopLink);

	window.IAG = IAG;
};
