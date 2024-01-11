import { createApp } from 'vue'
import App from './App.vue'

import { router } from './routers/index.js'
import store from "./stores/index.js";
import mixins from "./mixins.js";

const app = createApp(App);

app.mixin(mixins);
app.use(router).use(store).mount('#app')