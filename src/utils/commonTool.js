class commonTool {
	/**
	 * 获取url的参数
	 * @returns
	 */
	static queryString = () => {
		let _queryString = {};
		const _query = window.location.search.substr(1);
		const _vars = _query.split('&');
		_vars.forEach((v, i) => {
			const _pair = v.split('=');
			if (!_queryString.hasOwnProperty(_pair[0])) {
				_queryString[_pair[0]] = decodeURIComponent(_pair[1]);
			} else if (typeof _queryString[_pair[0]] === 'string') {
				const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
				_queryString[_pair[0]] = _arr;
			} else {
				_queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
			}
		});
		return _queryString;
	};

	/**
	 * @param  {} param
	 * @param  {} key
	 * @param  {} encode
	 */
	urlEncode = (param, key, encode) => {
		if (param == null) return '';
		let paramStr = '';
		let t = typeof param;
		if (t == 'string' || t == 'number' || t == 'boolean') {
			paramStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(param) : param);
		} else {
			for (var i in param) {
				var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
				paramStr += this.urlEncode(param[i], k, encode);
			}
		}
		return paramStr;
	};
}

export default commonTool;
