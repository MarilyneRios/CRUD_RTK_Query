// Besoin d'utiliser le point d'entrée spécifique à React pour importer createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Définissez un service en utilisant une URL de base et des points d'extrémité attendus
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://65f96b3ddf15145246119065.mockapi.io/api' }),
    tagTypes: ["User"],
    endpoints: (builder) => (
        {
        displayUsers: builder.query({
            query: () => `/users`,
            providesTags: ["User"],
        }),
        displayOneUser: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: ["User"],
        }),
        createUsers: builder.mutation({
            query: (user) => ({
                url: `/users`,
                method: "POST",
                body : user
            }),
            invalidatesTags:["User"],
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "PUT",
                body : user
            }),
            invalidatesTags:["User"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags:["User"],
        }),
    }
    ),
})

// Exportez les hooks pour une utilisation dans les composants fonctionnels, qui sont
// générés automatiquement en fonction des points d'extrémité définis
export const { 
    useDisplayUsersQuery, 
    useCreateUsersMutation, 
    useDisplayOneUserQuery, 
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi

/**
 tagTypes: ["User"] : définir les types de tags que vous allez utiliser dans votre API.

providesTags: ["User"] : Dans une requête pour dire à RTK Query, cette requête “fournit” des données d’un certain type.
Cela signifie que chaque fois que vous exécutez cette requête, RTK Query saura qu’elle a des données à jour pour le tag “User”.

invalidatesTags: ["User"] : Dans une mutation pour dire à RTK Query que cette mutation “invalide” certaines données.
 Dans ce cas, la mutation createUsers invalide les données de type “User”.
  Cela signifie que chaque fois que vous exécutez cette mutation, 
  RTK Query saura que ses données pour le tag “User” sont potentiellement obsolètes,
   et elle refera toutes les requêtes qui fournissent le tag “User” la prochaine fois qu’elles seront nécessaires.
 */