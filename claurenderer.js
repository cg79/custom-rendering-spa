
class Rendered {

	textToHtmlText = (text, data) => {
		const props = text.match(/(\{)(.*?)(\})/gi);
		var pName = '';
		props.forEach(p => {
			pName = p.replace('{', '').replace('}', '');
			text = text.replace(p, data[pName])
		})

		return text;
	}

	insertElement = (parentId, text, data) => {
		const htmlText = this.textToHtmlText(text, data);

        document.getElementById(parentId).insertAdjacentHTML('beforeend', htmlText);
        return this;
    }
    removeElement(id) {
        const htmlElement = document.getElementById(id);
        if(!htmlElement) {
            throw new Error(`no html element for ${id}`);
        }
        return htmlElement.parentNode.removeChild(htmlElement);
    }

	assignEv = (id, evName, func) => {
        let htmlElement = null;
        const exec = (el) => func(el, id);
        htmlElement = document.getElementById(id);
        if(!htmlElement) {
            throw new Error(`no html element for ${id}`);
        }
		htmlElement.addEventListener(evName, (element) => {
			exec(element);
        })
        return this;
	}
}

	// parse = (s) => {
	// 	var re = /(\{)(.*?)(\})/g;
	// 	s = s.replace(re, function (x, $1, $2, $3) {
	// 		return "el." + $2;
	// 	});
	// 	return s;
	// }

	/**
	* {age}< 5
	*/
	// createFunctionFromString = (s) => {
	// 	const expression = parse(s);
	// 	const body = `el => ${expression}`;
	// 	return new Function(body);
	// }
