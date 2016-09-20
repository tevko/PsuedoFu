/**
 * @param  elem - a string representation of the element ( class or ID or data attribute)
 * @return Object
 */
const psuedoFu = elem =>  {
	return {
		config: {
			error: 'please make sure the element being passed to PsuedoFoo contains a unique ID or class name'
		},
		/**
		 * @param  attr - the psuedo element in question
		 * @return Object - an object containing all styles attached to the element
		 */
		getProps(attr) {
			const obj = document.querySelector(elem);
			const styles = Object.assign(Object.create(psuedoFu.call(this, elem), {}), window.getComputedStyle(obj, attr));

			if (!(~elem.indexOf('.') || ~elem.indexOf('#'))) {
				return console.error(this.config.error);
			}
			return styles

		},
		/**
		 * @param  attr - the psuedo element in question
		 * @param  prop - the property to be retrieved
		 * @return String - the value of the specified property
		 */
		getProp(attr, prop) {
			return psuedoFu(elem).getProps(attr)[prop]
		},
		/**
		 * @param attr - the psuedo element in question
		 * @param prop - the property to be set
		 * @return Object
		 */
		setProps(attr, styles) {
			if (!(~elem.indexOf('.') || ~elem.indexOf('#'))) {
				return console.error(this.config.error);
			}
			//style cannot have : or :: in class name
			const pSplitVal = ~attr.indexOf('::') ? '::' : ':';
			//look for a class name first, then an ID
			const eSplitVal = ~elem.indexOf('.') ? '.' : '#';
			const styleCls = (`_psuedoCustom__${elem.split(eSplitVal)[1]}_${attr.split(pSplitVal)[1]}`).replace(' ', '-');
			let s;
			if (document.querySelector(`.${styleCls}`) === null) {
				s = document.createElement('style');
				s.classList.add(styleCls);
				document.head.appendChild(s);
			} else {
				s = document.querySelector(`.${styleCls}`);
			}
			s.sheet.insertRule(`
				${elem}${attr} {
					${styles}
				}
			`, 0);
			return  psuedoFu(elem)
		},
		/**
		 * @param  attr - the psuedo element in question
		 * @return Object
		 */
		reset(attr) {
			if (!(~elem.indexOf('.') || ~elem.indexOf('#'))) {
				return console.error(this.config.error);
			}
			//style cannot have : or :: in class name
			const pSplitVal = ~attr.indexOf('::') ? '::' : ':';
			//look for a class name first, then an ID
			const eSplitVal = ~elem.indexOf('.') ? '.' : '#';
			const styleCls = (`_psuedoCustom__${elem.split(eSplitVal)[1]}_${attr.split(pSplitVal)[1]}`).replace(' ', '-');
			document.querySelectorAll(`.${styleCls}`).forEach(e => document.head.removeChild(e));
			return psuedoFu(elem)
		}
	}
}