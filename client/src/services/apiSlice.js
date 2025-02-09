import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:3001/api",
    credentials: ["same-origin"],
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/registration",
        method: "POST",
        body: userData,
      }),
    }),
    checkSlug: builder.query({
      query: (slug) => `/workspace/check?slug=${encodeURIComponent(slug)}`,
    }),
    createWorkspace: builder.mutation({
      query: (workspaceData) => ({
        url: "/workspace/create",
        method: "POST",
        body: workspaceData,
      }),
    }),
    getWorkspaces: builder.query({
      query: () => "/workspace",
      providesTags: ["Workspace"],
    }),
    deleteWorkspace: builder.mutation({
      query: (id) => ({
        url: `/workspace/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workspace"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          "x-refresh-token": localStorage.getItem("refreshToken"),
        },
      }),
    }),
  }),
});

export const { 
  useGetUsersQuery,
  useLoginMutation, 
  useRegisterMutation, 
  useCheckSlugQuery, 
  useCreateWorkspaceMutation, 
  useGetWorkspacesQuery, 
  useDeleteWorkspaceMutation,
  useLogoutMutation
} = apiSlice;
