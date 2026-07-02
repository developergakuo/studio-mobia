import { createApp, provide, h } from 'vue';
import { createPinia } from 'pinia';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import router from './router';
import './assets/main.css';

const apolloClient = new ApolloClient({
    uri: import.meta.env.VITE_API_URL || 'http://localhost:5002/graphql',
    cache: new InMemoryCache(),
});

const app = createApp({
    setup() { provide(DefaultApolloClient, apolloClient); },
    render: () => h(App),
});

app.use(createPinia());
app.use(router);
app.mount('#app');
