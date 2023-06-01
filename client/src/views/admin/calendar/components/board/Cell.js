import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { InvalidCellsDisplayType } from "utils/SettingsUtils";
export let squareLength = 30;

let getCellStyle = (active, valid, invalidCellsDisplayType, backgroundColor) => {
  let colorOptions;

  switch (invalidCellsDisplayType) {
    case InvalidCellsDisplayType.NORMAL:
      colorOptions = {
        border: active
          ? "3px solid rgba(0, 0, 0, 0.7)"
          : "1px solid rgb(0, 0, 0)",
        bg: backgroundColor,
        cursor: valid ? "pointer" : "not-allowed",
      };
      break;

      case InvalidCellsDisplayType.INVISIBLE:
      colorOptions = {
        border: valid
          ? active
            ? "3px solid rgba(0, 0, 0, 0.7)"
            : "1px solid rgb(0, 0, 0)"
          : "none",
        bg: backgroundColor,
        cursor: valid ? "pointer" : "default",
      };
      break;
    case InvalidCellsDisplayType.GRAYED_OUT:
      colorOptions = {
        border: active
          ? "3px solid rgba(0, 0, 0, 0.7)"
          : "1px solid rgb(0, 0, 0)",
        bg: valid ? backgroundColor : "rgba(0, 0, 0, 0.25)",
        cursor: valid ? "pointer" : "not-allowed",
      };
      break;
    default:
      colorOptions = {};
      break;
  }

  return {
    w: `${squareLength}px`,
    h: `${squareLength}px`,
    position: "relative",
    zIndex: "0",
    ...colorOptions,
  };
};

let todayTriangle = {
  content: "",
  position: "absolute",
  top: "0",
  right: "0",
  w: 0,
  h: 0,
  display: "block",
  borderLeft: "10px solid transparent",
  borderBottom: "10px solid transparent",
  borderTop: "10px solid black",
};

export class Cell extends React.Component {
    constructor(props) {
      super(props);
  
      this.ref = React.createRef();
    }
  
    getXY = () => {
      if (this.ref.current === null) return [-1, -1];
      let rect = this.ref.current.getBoundingClientRect();
      return [rect.x + (rect.width * 3) / 4, rect.y + rect.height / 2];
    };
  
    render() {
      let backgroundColor = "";
      if (this.props.value) {
        let length = this.props.colorSchemes.length;
        let value = parseInt(this.props.value) - 1;
  
        if (value >= 0 && value < length) {
          let color = this.props.colorSchemes[value];
          backgroundColor =
            "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
        }
      }
  
      this.props.setCurrentDayXYProvider(this.getXY);
  
      return (
        <Box
          sx={getCellStyle(
            this.props.active,
            this.props.valid,
            this.props.invalidCellsDisplayType,
            backgroundColor
          )}
          ref={this.ref}
          onClick={(e) => {
            if (this.props.valid) {
              e.stopPropagation();
              this.props.handleClick(
                this.getXY,
                this.props.month,
                this.props.day
              );
            }
          }}
        >
            {this.props.showTodayMarker && <Box sx={todayTriangle}></Box>}
        {this.props.showDayNumber && this.props.valid && (
          <Text fontSize="sm" mt="-15px" textAlign="left">
            {this.props.day + 1}
          </Text>
        )}
      </Box>
    );
  }
}