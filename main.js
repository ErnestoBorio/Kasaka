import Savage from "./Savage.js";
const response = await fetch("http://127.0.0.1:8080/src/player.svg");
const svgText = await response.text();

const savage = new Savage(svgText);
savage.mount(document.getElementById("container"));

/** @type {{string: NodeListOf<SVGElement>}} */
const dom = {
	colors: savage.root.querySelectorAll("[id^='colors'] > *"),
	icons: savage.root.querySelectorAll("[id^='icons'] > *"),
	shirt: savage.root.querySelectorAll("[id^='player'] [id^='shirt'] > *"),
	pants: savage.root.querySelectorAll("[id^='player'] [id^='pants'] > *"),
	socks: savage.root.querySelectorAll("[id^='player'] [id^='socks'] > *"),
};

for (const items of [dom.colors, dom.icons, dom.shirt, dom.pants]) {
	/** @type {SVGElement} */
	let item;
	for (item of items) {
		item.style["stroke-width"] = 2;
		item.addEventListener("mouseenter", (event) => {
			event.target.style.stroke = "silver";
		});
		item.addEventListener("mouseleave", (event) => {
			event.target.style.stroke = "none";
		});
	}
}

dom.socks[0].style["stroke-width"] = dom.socks[1].style["stroke-width"] = 2;
dom.socks[0].addEventListener("mouseenter", (event) => {
	dom.socks[0].style["stroke"] = "silver";
	dom.socks[1].style["stroke"] = "silver";
});
dom.socks[0].addEventListener("mouseleave", (event) => {
	dom.socks[0].style["stroke"] = "none";
	dom.socks[1].style["stroke"] = "none";
});
dom.socks[1].addEventListener("mouseenter", (event) => {
	dom.socks[0].style["stroke"] = "silver";
	dom.socks[1].style["stroke"] = "silver";
});
dom.socks[1].addEventListener("mouseleave", (event) => {
	dom.socks[0].style["stroke"] = "none";
	dom.socks[1].style["stroke"] = "none";
});

let primaryColor, secondaryColor;
for (const color of dom.colors) {
	color.addEventListener("click", (event) => {
		primaryColor = color.getAttribute("fill");
	});
	color.addEventListener("contextmenu", (event) => {
		event.preventDefault();
		secondaryColor = color.getAttribute("fill");
	});
}
