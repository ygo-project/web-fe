const leagueStore = {
    state: {
        stage: 0,
        leagueSeq: -1,
        leagueName: '',
        fighterList: [],
        tournamentList: [],
        swissList: [],
        swissRoundReady: [],
    },
    getters: {
        GET_STAGE: state => state.stage,
        GET_LEAGUE_SEQ: state => state.leagueSeq,
        GET_LEAGUE_NAME: state => state.leagueName,
        GET_FIGHTER_LIST: state => state.fighterList,
        GET_TOURNAMENT_LIST: state => state.tournamentList,
        GET_SWISS_LIST: state => state.swissList,
        GET_SWISS_ROUND_READY: state => state.swissRoundReady,
    },
    mutations: {
        MUT_STAGE: (state, payload) => {
            state.stage = payload;
        },
        MUT_LEAGUE_SEQ: (state, payload) => {
            state.leagueSeq = payload;
        },
        MUT_LEAGUE_NAME: (state, payload) => {
            state.leagueName = payload;
        },
        MUT_FIGHTER_LIST: (state, payload) => {
            state.fighterList = payload;
        },
        MUT_TOURNAMENT_LIST: (state, payload) => {
            state.tournamentList = payload;
        },
        MUT_SWISS_LIST: (state, payload) => {
            state.swissList = payload;
        },
        MUT_SWISS_ROUND_READY: (state, payload) => {
            state.swissRoundReady = payload;
        },
    },
    actions: {
        ACT_STAGE: ({ commit }, payload) => {
            commit('MUT_STAGE', payload);
        },
        ACT_LEAGUE_SEQ: ({ commit }, payload) => {
            commit('MUT_LEAGUE_SEQ', payload);
        },
        ACT_LEAGUE_NAME: ({ commit }, payload) => {
            commit('MUT_LEAGUE_NAME', payload);
        },
        ACT_FIGHTER_LIST: ({ commit }, payload) => {
            commit('MUT_FIGHTER_LIST', payload);
        },
        ACT_TOURNAMENT_LIST: ({ commit }, payload) => {
            commit('MUT_TOURNAMENT_LIST', payload);
        },
        ACT_SWISS_LIST: ({ commit }, payload) => {
            commit('MUT_SWISS_LIST', payload);
        },
        ACT_SWISS_ROUND_READY: ({ commit }, payload) => {
            commit('MUT_SWISS_ROUND_READY', payload);
        },
    }
};

export default leagueStore;
