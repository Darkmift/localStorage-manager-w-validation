class manageLS {
	_safemode;
	_ls;
	constructor() {
		this._safemode = true;
		const self = this;

		// invoke on instantce creation
		(() => {
			if (typeof localStorage === 'undefined') {
				throw new Error(`localStorage is not supported in this browser 💩`);
			} else {
				self._ls = localStorage;
			}
		})();
	}

	toggleSafety() {
		if (typeof bool != 'boolean') throw new Error(`arg ${bool} is not a boolean`);
		this._safemode = !this._safemode;
	}

	valueExists(key) {
		console.log(this._ls.hasOwnProperty(key));
		if (this._ls.hasOwnProperty(key)) {
			throw new Error(`arg ${key} is already defined`);
		}
	}

	setItem(key, value) {
		if (arguments.length != 2) throw new Error(`missing arg:key: ${key},value: ${value}`);
		this.valueExists(key);

		if (this._safemode && this.valueExists(key)) {
			throw new Error(`safe mode is on: cannot override ${key}`);
		}
		this._ls[key] = value;
	}

	getItem(entry) {
		const entry_key = Object.keys(this._ls).filter(key => key === entry)[0] || undefined;
		return entry_key ? { [entry_key]: this._ls[entry] } : undefined;
	}

	removeItem(key) {
		delete this._ls[key];
	}
}

const manageLS_Instance1 = new manageLS();
manageLS_Instance1.setItem('key', 1);
console.log(`manageLS_Instance1.getItem('key')`, manageLS_Instance1.getItem('key'));
manageLS_Instance1.removeItem('key');
manageLS_Instance1.setItem('key', 1);
manageLS_Instance1.toggleSafety();
manageLS_Instance1.setItem('key', 1);
