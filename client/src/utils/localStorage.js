export const getSavedJournalIds = () => {
  const savedJournalIds = localStorage.getItem('saved_journals')
    ? JSON.parse(localStorage.getItem('saved_journals'))
    : [];

  return savedJournalIds;
};

export const saveJournalIds = (journalIdArr) => {
  if (journalIdArr.length) {
    localStorage.setItem('saved_journals', JSON.stringify(journalIdArr));
  } else {
    localStorage.removeItem('saved_journals');
  }
};

export const removeJournalId = (journalId) => {
  const savedJournalIds = localStorage.getItem('saved_journals')
    ? JSON.parse(localStorage.getItem('saved_journals'))
    : null;

  if (!savedJournalIds) {
    return false;
  }

  const updatedSavedJournalIds = savedJournalIds?.filter((savedJournalId) => savedJournalId !== journalId);
  localStorage.setItem('saved_journals', JSON.stringify(updatedSavedJournalIds));

  return true;
};

export const getSavedEntryIds = () => {
  const savedEntryIds = localStorage.getItem('saved_entries')
    ? JSON.parse(localStorage.getItem('saved_entries'))
    : [];

  return savedEntryIds;
};

export const saveEntryIds = (entryIdArr) => {
  if (entryIdArr.length) {
    localStorage.setItem('saved_entries', JSON.stringify(entryIdArr));
  } else {
    localStorage.removeItem('saved_entries');
  }
};

export const removeEntryId = (entryId) => {
  const savedEntryIds = localStorage.getItem('saved_entries')
    ? JSON.parse(localStorage.getItem('saved_entries'))
    : null;

  if (!savedEntryIds) {
    return false;
  }

  const updatedSavedEntryIds = savedEntryIds?.filter((savedEntryId) => savedEntryId !== entryId);
  localStorage.setItem('saved_entries', JSON.stringify(updatedSavedEntryIds));

  return true;
};