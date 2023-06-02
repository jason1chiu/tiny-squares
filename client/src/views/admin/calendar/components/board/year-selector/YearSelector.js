import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Select } from "@chakra-ui/react";
import { DeleteButton } from "js/components/main/IconButton";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Tooltip, OverlayTrigger } from "@chakra-ui/react";
import selectStyles from "./YearSelectStyle";

export default function YearSelector(props) {
const onChangeYear = (option) => {
let newYear = option.value;

if (newYear === "Add") {
    props.showAddYearModal();
    return;
  }
  
  props.changeYear(newYear);

};

const addSelectOverlay = (component) => {
return (
<div className="flex-grow-1" style={{ maxWidth: "250px" }}>
{component}
</div>
);
};

const createDeleteButton = (disabledForNoAccount, disabledForYearsLength) => {
let button = (
<DeleteButton
disabled={disabledForNoAccount || disabledForYearsLength}
handleClick={() => {
console.log("Deleting the year: " + props.year);
props.deleteYear(props.year);
}}
inLg={props.inLg}
/>
);

if (disabledForNoAccount || disabledForYearsLength) {
    return (
      <span style={{ display: "inline-block" }}>{button}</span>
    );
  }
  
  return button;

};

let options = props.years.map((option) => {
return {
value: String(option),
label: String(option),
};
});

options.push({
value: "Add",
label: "Add Year",
});

let select = (
<Select
value={{ value: props.year, label: props.year }}
options={options}
isDisabled={props.disabled}
onChange={onChangeYear}
styles={selectStyles}
className="flex-grow-1"
isSearchable={false}
style={{ maxWidth: "250px" }}
/>
);

select = props.disabled ? addSelectOverlay(select) : select;

return (
<Container className={props.className}>
<Row>
<Col className="d-flex justify-content-center px-0">
<p
className="text-right my-auto mr-2"
style={{ fontWeight: 520, fontSize: "1.15rem" }}
>
Select Year:
</p>
{select}
{createDeleteButton(props.disabled, props.years.length === 1)}
</Col>
</Row>
</Container>
);
}