export class TableRows {
	static query = ".table-row";

	initialize() {
		this.#bindEvents();
	}

	#bindEvents() {
		document.querySelectorAll(TableRows.query).forEach((element) => {
			element.addEventListener("click", this.#handleClick.bind(this, element));
		});
	}

	#handleClick(element: Element) {
		console.log("Table Row Clicked!");
	}
}
