import { createStore } from "vuex";
import themeModeStore from "@/stores/themeMode.js";
import userStore from "@/stores/user.js";

export default createStore({
	modules: {
		themeModeStore: themeModeStore,
		userStore: userStore,
	},
});
