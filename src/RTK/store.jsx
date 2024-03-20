import { configureStore } from '@reduxjs/toolkit';

import { userApi } from './userAPI';

export const store = configureStore({
  reducer: {
    // Ajoutez le réducteur généré en tant que tranche (slice) spécifique de niveau supérieur
    [userApi.reducerPath]: userApi.reducer,
  },
  // L'ajout du middleware API permet la mise en cache, l'invalidation, le polling,
  // et d'autres fonctionnalités utiles de `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

