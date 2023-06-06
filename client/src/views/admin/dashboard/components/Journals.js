import { Text, useColorModeValue } from "@chakra-ui/react";
import Journal from "./Journal";
import Journal1 from "assets/img/purple.jpg";
import Journal2 from "assets/img/purple.jpg";
import Journal3 from "assets/img/purple.jpg";
import Card from "components/card/card.js";
import React from "react";

import { useAuth } from "contexts/auth.context";

// import { GET_JOURNALS_DASHBOARD } from "utils/queries";
// import { useQuery } from "@apollo/client";

export default function Journals(props) {
  // const { data } = useQuery(GET_JOURNALS_DASHBOARD);
  const { journals } = useAuth();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
       Journals
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        Update your journals daily
      </Text>
      {journals.map((journal, index) => 
      <Journal
        boxShadow={cardShadow}
        mb="20px"
        image={Journal1}
        link="#"
        ranking={index + 1}
        title={journal.name}
      />
      )}
      {/* <Journal
        boxShadow={cardShadow}
        mb="20px"
        image={Journal2}
        link="#"
        ranking="2"
        title="Journal 2"
      />
      <Journal
        boxShadow={cardShadow}
        mb="20px"
        image={Journal3}
        link="#"
        ranking="3"
        title="Journal 3"
      /> */}
    </Card>
  );
}
