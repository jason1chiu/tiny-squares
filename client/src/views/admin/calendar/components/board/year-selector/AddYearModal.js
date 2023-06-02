import React, { useState, useRef } from "react";
import {
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalTitle,
ModalBody,
ModalFooter,
Button,
Container,
FormControl,
Input,
InputGroup,
InputLeftAddon,
FormErrorMessage,
} from "@chakra-ui/react";
import { BsFillCalendarFill } from "react-icons/bs";

const AddColorSchemeModal = ({
visible,
closeModal,
checkYearExists,
addYear,
}) => {
    const [validated, setValidated] = useState(false);
const [year, setYear] = useState("");
const [yearInvalid, setYearInvalid] = useState(false);
const formRef = useRef();

const onChangeYear = async (e) => {
let year = e.target.value;
let yearInvalid = await checkYearExists(year);
if (year < 1000 || year > 9999) {
yearInvalid = true;
}
setYear(year);
setYearInvalid(yearInvalid);
};

const handleSubmit = (e) => {
e.preventDefault();
e.stopPropagation();
if (yearInvalid) return;

setValidated(true);

if (formRef.current.checkValidity() === true) {
  addYear(year);
  closeModal();

  setYear("");
  setYearInvalid(false);
}
};

return (
<Modal isOpen={visible} onClose={closeModal} size="md">
<ModalOverlay />
<ModalContent>
<ModalHeader>
<ModalTitle>Add Year</ModalTitle>
</ModalHeader>
<ModalBody>
<Container>
<form noValidate validated={validated} ref={formRef}>
<FormControl isInvalid={yearInvalid}>
<InputGroup>
<InputLeftAddon children={<BsFillCalendarFill />} />
<Input
                 placeholder="Year"
                 type="number"
                 required
                 value={year}
                 onChange={onChangeYear}
               />
                <FormErrorMessage>
                Year already exists / is invalid
              </FormErrorMessage>
            </InputGroup>
          </FormControl>
        </form>
      </Container>
    </ModalBody>
    <ModalFooter>
      <Button
        variant="danger"
        mr={4}
        onClick={closeModal}
      >
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
);
};

export default AddColorSchemeModal;