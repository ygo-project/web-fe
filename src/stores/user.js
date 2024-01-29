const userStore = {
    state: {
        user_id: '',
    },
    getters: {
        GET_USER_ID: state => state.user_id
    },
    mutations: {
        MUT_USER_ID: (state, payload) => {
            state.user_id = payload;
        },
    },
    actions: {
        ACT_USER_ID: ({ commit }, payload) => {
            commit('MUT_USER_ID', payload);
        },
    }
};

export default userStore;
