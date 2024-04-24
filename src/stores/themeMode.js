const themeModeStore = {
	state: {
		isDarkMode: Boolean(localStorage.getItem('isDarkMode') === 'true'),
		auth: Number(localStorage.getItem('userAuth') ? localStorage.getItem('userAuth') === 'ADMIN' ? 2 : 1 : 0),
	},
	getters: {
		GET_IS_DARK_MODE: state => state.isDarkMode,
		GET_AUTH: state => state.auth,
	},
	mutations: {
		MUT_DARK_MODE: (state, payload) => {
			localStorage.setItem('isDarkMode', String(true));
			state.isDarkMode = true;
			document.documentElement.setAttribute('data-theme', 'dark');
		},
		MUT_LIGHT_MODE: (state, payload) => {
			localStorage.setItem('isDarkMode', String(false));
			state.isDarkMode = false;
			document.documentElement.setAttribute('data-theme', 'light');
		},
		MUT_AUTH: (state, payload) => {
			if (payload) {
				state.auth = payload ? payload === 'ADMIN' ? 2 : 1 : 0;
				localStorage.setItem('userAuth', payload);
			} else {
				localStorage.removeItem('userAuth');
				state.auth = undefined;
			}
		}
	},
	actions: {
		ACT_DARK_MODE: ({ commit }, payload) => {
			commit('MUT_DARK_MODE', payload);
		},
		ACT_LIGHT_MODE: ({ commit }, payload) => {
			commit('MUT_LIGHT_MODE', payload);
		},
		ACT_AUTH: ({ commit }, payload) => {
			commit('MUT_AUTH', payload);
		},
	}
}

export default themeModeStore;
