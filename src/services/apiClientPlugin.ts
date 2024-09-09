import apiClient from '@/services/apiClient'; // Убедитесь, что импортируете корректный модуль

const apiClientPlugin = {
	install(app: any) {
		app.config.globalProperties.$apiClient = apiClient;
	},
};

export default apiClientPlugin;
