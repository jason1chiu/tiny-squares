// import { Box, Grid } from "@chakra-ui/react";
// import React, { useState } from "react";
// import Board from "components/shared/calendar/components/board/Board";
// import Legend from "components/shared/calendar/components/legend/Legend";
// import { useQuery } from "@apollo/client";
// import { GET_JOURNAL } from "utils/queries";

// export default function Overview({ journal_id }) {
  
//   // const [trigger, setTrigger] = useState(null)
//   const { data, refetch } = useQuery(GET_JOURNAL, {
//     variables: {
//       id: journal_id,
//     },
//   });

//   return (
//     <Box pt={{ base: "10px", md: "10px", xl: "10px" }}>
//       <Grid>
//         <Legend
//           journalId={journal_id}
//           refetchEntries={refetch}
//         />
//         <Board data={data}
//           journalId={journal_id}

//         />
//       </Grid>
//     </Box>
//   );
// }

import { Box, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import Board from "components/shared/calendar/components/board/Board";
import { useQuery } from "@apollo/client";
import { GET_JOURNAL } from "utils/queries";

export default function Overview({ journal_id, data, refetch }) {
  return (
    <Box pt={{ base: "10px", md: "10px", xl: "10px" }}>
      <Grid>
        <Board 
          data={data}
          journalId={journal_id}
          refetch={refetch}
        />
      </Grid>
    </Box>
  );
}
