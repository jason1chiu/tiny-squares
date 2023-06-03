import React from "react";
import Preview from "components/card/preview";

import { useDisclosure } from "@chakra-ui/react";
import PreviewModal from "views/admin/journals/components/PreviewModal";

export default function YourJournalCard({ journal }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Preview
        name={journal.name}
        author={journal.author}
        image={journal.image}
        onViewClick={onOpen}
      />
      <PreviewModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

