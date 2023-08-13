import React from "react";
import Preview from "components/card/preview";

import { useDisclosure } from "@chakra-ui/react";
import PreviewModal from "views/admin/journals/components/PreviewModal";
import { useAuth } from "contexts/auth.context";

import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_JOURNAL } from "utils/mutations";
import { GET_JOURNALS, GET_ME } from "utils/queries";

export default function YourJournalCard({ journal, client }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let { user } = useAuth();

  const { refetch } = useQuery(GET_JOURNALS);

  const { data: meData, refetch: meRefetch } = useQuery(GET_ME);

  const [removeJournal] = useMutation(REMOVE_JOURNAL);

  const handleDeleteJournal = async (journalId) => {
    try {
      const { data } = await removeJournal({
        variables: { journalId },
      });
      console.log("Journal deleted:", data.removeJournal);
      refetch(); // refetch journal data
      meRefetch(); //refetch user data
    } catch (error) {
      console.error("Error deleting journal:", error);
    }
  };

  return (
    <>
      <Preview
        name={journal.name}
        author={user.user.username}
        image={journal.image}
        onViewClick={(...rest) => {
          onOpen(...rest);
          client.resetStore();
        }}
        onDeleteClick={() => handleDeleteJournal(journal._id)} // Pass journal ID to the delete function
      />
      <PreviewModal
        isOpen={isOpen}
        onClose={onClose}
        journal={journal}
      />
    </>
  );
}
