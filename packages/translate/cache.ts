export interface ICacheItem {
	value: string;
	expire: number;
	timeout?: NodeJS.Timeout;
}

export interface ICache {
	put(key: string, value: string, time: number, timeoutCallback: Function): string;
	del(key: string): boolean;
	clear(): void;
	get(key: string): string;
}

class Cache implements ICache {
	#cache: Record<string, ICacheItem>;
	#size: number;

	constructor() {
		this.#cache = Object.create(null);
		this.#size = 0;
	}

	put(key: string, value: string, time: number, timeoutCallback?: Function): string {
		if (typeof time !== "undefined" && (typeof time !== "number" || isNaN(time) || time <= 0)) {
			throw new Error("Cache timeout must be a positive number");
		} else if (typeof timeoutCallback !== "undefined" && typeof timeoutCallback !== "function") {
			throw new Error("Cache timeout callback must be a function");
		}

		const oldRecord = this.#cache[key];
		if (oldRecord) {
			clearTimeout(oldRecord.timeout);
		} else {
			this.#size++;
		}

		const record: ICacheItem = {
			value: value,
			expire: time + Date.now(),
		};

		if (!isNaN(record.expire)) {
			const _this = this;
			record.timeout = setTimeout(
				function () {
					_this.#del(key);
					if (timeoutCallback) {
						timeoutCallback(key, value);
					}
				}.bind(this),
				time
			);
		}

		this.#cache[key] = record;

		return value;
	}

	del(key: string): boolean {
		let canDelete = true;

		const oldRecord = this.#cache[key];
		if (oldRecord) {
			clearTimeout(oldRecord.timeout);
			if (!isNaN(oldRecord.expire) && oldRecord.expire < Date.now()) {
				canDelete = false;
			}
		} else {
			canDelete = false;
		}

		if (canDelete) {
			this.#del(key);
		}

		return canDelete;
	}

	#del(key: string): void {
		this.#size--;
		delete this.#cache[key];
	}

	clear(): void {
		for (const key in this.#cache) {
			clearTimeout(this.#cache[key].timeout);
		}
		this.#size = 0;
		this.#cache = Object.create(null);
	}

	get(key: string): string {
		const data = this.#cache[key];
		if (typeof data != "undefined") {
			if (isNaN(data.expire) || data.expire >= Date.now()) {
				return data.value;
			} else {
				// free some space
				this.#size--;
				delete this.#cache[key];
			}
		}
		return "";
	}
}

const exp = new Cache();
export default exp;
