import { createSelector } from 'reselect';
export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;
export const getLoading = state => state.contacts.loading;
export const filterContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  },
);
