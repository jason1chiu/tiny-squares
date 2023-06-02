import { extendTheme } from "@chakra-ui/react";
import chroma from "chroma-js";

const customTheme = extendTheme({
components: {
Select: {
baseStyle: {
container: {
maxWidth: "250px",
textAlign: "center",
},
control: {
backgroundColor: "white",
fontSize: "1.0rem",
},
option: (props) => {
const { data, isDisabled, isFocused, isSelected } = props;
let backgroundColor = chroma("#FFF").css();
if (isSelected) {
backgroundColor = chroma("#DDD").css();
} else if (isFocused) {
backgroundColor = chroma("#DDD").alpha(0.6).css();
}
return {
backgroundColor,
color: "black",
fontSize: "1.0rem",
maxWidth: "250px",
};
},
},
},
},
});

export default customTheme;