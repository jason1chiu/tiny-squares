import React from "react";
import Preview from "components/card/preview";

import { useDisclosure } from "@chakra-ui/react";
import PreviewModal from "views/admin/journals/components/PreviewModal";
import { useAuth } from "contexts/auth.context";
import { GET_ME } from "utils/queries";

export default function YourJournalCard({ journal }) {
  console.log(journal);
  const { isOpen, onOpen, onClose } = useDisclosure();
  let { user } = useAuth();
  return (
    <>
      <Preview
        name={journal.name}
        author={user.user.username}
        image={journal.image}
        onViewClick={onOpen}
      />
      <PreviewModal isOpen={isOpen} onClose={onClose} journal={journal} />
    </>
  );
}