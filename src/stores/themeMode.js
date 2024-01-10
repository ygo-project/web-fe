const themeModeStore = {
	state: {
		isDarkMode: Boolean(localStorage.getItem('isDarkMode') === 'true'),
	},
	getters: {
		GET_IS_DARK_MODE: state => state.isDarkMode
	},
	mutations: {
		MUT_DARK_MODE: (state, payload) => {
			localStorage.setItem('isDarkMode', String(true));
			state.isDarkMode = true;
			document.body.dataset.theme = 'dark';
		},
		MUT_LIGHT_MODE: (state, payload) => {
			localStorage.setItem('isDarkMode', String(false));
			state.isDarkMode = false;
			document.body.dataset.theme = 'light';
		},
	},
	actions: {
		ACT_DARK_MODE: ({ commit }, payload) => {
			commit('MUT_DARK_MODE', payload);
		},
		ACT_LIGHT_MODE: ({ commit }, payload) => {
			commit('MUT_LIGHT_MODE', payload);
		},
	}
}

export default themeModeStore;