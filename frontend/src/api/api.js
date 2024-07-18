import store from '@/store/index.js'
import axios from 'axios';

axios.interceptors.request.use((config) =>{
	let params = new URLSearchParams();
	params.append('auth', store.userInfo.token)

	config.params = params
	return config
})