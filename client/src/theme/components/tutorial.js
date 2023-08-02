import { css } from "@emotion/react";

export const tutorialStyles = {

    options: {
        tooltipWidth: 300,
        zIndex: 10000,
        primaryColor: "#965ed9", 
        textColor: "#000",
        overlayColor: "rgba(0, 0, 0, 0.4)",
    spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    backgroundColor: "#f7f7f7",
    fontFamily: "'DM Sans', sans-serif",
    },

    tooltip: {
        display: "flex",
        flexDirection: "column",
      },
      tooltipContent: {
        flexGrow: 1,
        padding: "20px",
      },
      tooltipTitle: css`
    color: "#965ed9";
    text-transform: "uppercase";
    `,
    tooltipFooter: {
        display: "flex",
        justifyContent: "space-between",
      },
      tooltipFooterSpacer: {
        width: "10px",
      },
      buttonClose: {
        display: "none",
      },
      buttonBack: {
        marginRight: "auto",
      },
    };