/**
 * Created by J on 2018-08-17.
 * http通用工具函数
 */

import { commonTool, tokenTool } from './index';
import * as CONST from '../constants';
import axios from 'axios';
import { message } from 'antd';

export class FetchRequest {
	/**
	 * post 方法
	 * @param {string} url
	 * @param {object} params
	 */
	static post(url, params) {
		return request(url, params, 'post');
	}

	/**
	 * get 方法
	 * @param {string} url
	 * @param {object|string} params
	 */
	static get(url, params) {
		return request(url, params, 'get');
	}

	/**
	 * post 方法 - 不需要携带token
	 * @param {*} url
	 * @param {*} params
	 */
	static postNoAuth(url, params) {
		return request(url, params, 'post', false);
	}
}

/**
 * @param  {string} url
 * @param  {string|Array} params
 * @param  {string} method
 * @param  {boolean} [auth=true]
 */
function request(url, params, method, auth = true) {
	if (typeof params !== 'string' && method === 'get') {
		params = commonTool.urlEncode(params);
		if (params.startsWith('&')) {
			params = params.substring(1);
		}
	}
	let server = CONST.API_HOST;

	let data = {};
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json;charset=UTF-8'
	};

	if (auth) {
		let _token = tokenTool.getToken();
		console.log('auth:' + _token);
		headers.Authorization = 'Bearer ' + _token.replace(/"/g, '');
	}

	if (method === 'get') {
		url += '?' + params;
		url += '&r=' + Math.random();
	} else {
		url += '?r=' + Math.random();
		data = JSON.stringify(params);
	}

	const axiosInstance = axios.create({
		baseURL: server,
		headers: headers
	});

	axiosInstance.interceptors.request.use(
		(config) => {
			if (auth) {
				let _token = tokenTool.getToken();
				config.headers.Authorization = `Bearer ${_token.replace(/"/g, '')}`;
			}
			return config;
		},
		(err) => {
			console.log(err);
			return Promise.reject(err);
		}
	);
	return axiosInstance({
		method: method,
		url: url,
		data: data
	})
		.then((res) => res.data)
		.catch((err) => {
			// console.trace('网络请求错误: ' + err + ' , ' + JSON.stringify(err));
			console.log(JSON.stringify(err));
			message.warn(JSON.stringify(`${err.message}`));
		});
}
