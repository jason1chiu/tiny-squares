import { Text, useColorModeValue, Link, Tooltip } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Journal from "./Journal";
import { GET_JOURNALS } from "utils/queries";
import { useQuery } from "@apollo/client";
import Card from "components/card/card.js";
import React, { useEffect, useState } from "react";

export default function Journals({ setShouldRefetch }) {
  const { loading, data, refetch } = useQuery(GET_JOURNALS,);
  let [outdatedJournals, setOutdatedJournals] = useState([]);

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const newOutdatedJournals = data?.journals.filter((journal) => {
      const updatedAt = new Date(Number(journal.updatedAt));
      const createdAt = new Date(Number(journal.createdAt));
      return (
        updatedAt.getTime() === createdAt.getTime() ||
        updatedAt.getTime() < today.getTime()
      );
    });
    setOutdatedJournals(newOutdatedJournals);
  }, [data?.journals]);

  const hasJournals = outdatedJournals?.length > 0;
  const history = useHistory();

  useEffect(() => {
    refetch();
  }, [refetch]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card mb={{ base: "0px", lg: "20px" }} align="center">
      <Tooltip label="View all journals" fontSize="md">
        <Link
          onClick={() => history.push("/admin/journals")}
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
          mb="4px"
          _hover={{ color: "gray.500" }}
          id="jlink-step"
        >
          Journals
        </Link>
      </Tooltip>
      {hasJournals ? (
        <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
          Update your journals daily
        </Text>
      ) : (
        <Text
          color={textColorSecondary}
          fontSize="md"
          me="26px"
          mb="40px"
          id="update-step"
        >
          No Journals to Update
        </Text>
      )}
      {outdatedJournals?.map((journal, index) => (
        <Journal
          id="update-step"
          key={journal._id}
          refetch={journal.refetch}
          boxShadow={cardShadow}
          mb="20px"
          image={journal.image}
          ranking={index + 1}
          updatedAt={journal.updatedAt}
          title={journal.name}
          journal={journal}
        />
      ))}
    </Card>
  );
}
