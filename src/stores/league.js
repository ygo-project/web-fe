const leagueStore = {
    state: {
        stage: 0,
        leagueName: '',
        fighterList: [],
    },
    getters: {
        GET_STAGE: state => state.stage,
        GET_LEAGUE_NAME: state => state.leagueName,
        GET_FIGHTER_LIST: state => state.fighterList
    },
    mutations: {
        MUT_STAGE: (state, payload) => {
            state.stage = payload;
        },
        MUT_LEAGUE_NAME: (state, payload) => {
            state.leagueName = payload;
        },
        MUT_FIGHTER_LIST: (state, payload) => {
            state.fighterList = payload;
        }
    },
    actions: {
        ACT_STAGE: ({ commit }, payload) => {
            commit('MUT_STAGE', payload);
        },
        ACT_LEAGUE_NAME: ({ commit }, payload) => {
            commit('MUT_LEAGUE_NAME', payload);
        },
        ACT_FIGHTER_LIST: ({ commit }, payload) => {
            commit('MUT_FIGHTER_LIST', payload);
        }
    }
};

export default leagueStore;
