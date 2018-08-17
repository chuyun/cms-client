class TokenTool {
	/**
	 * 获取token
	 */
	static getToken = () => {
		let token = sessionStorage.getItem('token');
		if (token) return token;
		/*window.location.href = '/login';*/
	};
	/**
	 * 设置token
	 * @param {string} token
	 */
	static setToken = (token) => {
		sessionStorage.setItem('token', token);
	};
	/**
	 * 移除token
	 */
	static removeToken = () => {
		sessionStorage.removeItem('token');
	};
}

export default TokenTool;
