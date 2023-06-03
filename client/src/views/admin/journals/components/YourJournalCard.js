import React from "react";
import Preview from "components/card/preview";

export default function YourJournalCard({journal}) {
    return (
      <Preview
        // name={journal.name}
        // author={journal.author}
        // image={journal.image}
        name="journal"
        author="journal"
        image={journal.image}
      />
    );
  }