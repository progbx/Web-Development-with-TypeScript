import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3033/api/contacts/' }),
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => '',
    }),
    addContact: builder.mutation<Contact, { name: string; phone: string }>({
      query: (newContact) => ({
        url: '',
        method: 'POST',
        body: newContact,
      }),
    }),
    removeContact: builder.mutation<void, string>({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useRemoveContactMutation,
} = contactsApi;
