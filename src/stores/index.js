import { createStore } from "vuex";
import themeModeStore from "@/stores/themeMode.js";

export default createStore({
	modules: {
		themeModeStore: themeModeStore,
	},
});