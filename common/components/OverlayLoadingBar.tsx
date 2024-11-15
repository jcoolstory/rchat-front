import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

const DialogWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  min-width: 320px;
  z-index: 50;
`;

const ContentWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
`;

const OverlayLoadingBar = () => {
  return (
    <DialogWrapper>
      <ContentWrapper>
      <CircularProgress />
      </ContentWrapper>
    </DialogWrapper>
  );
};

export default OverlayLoadingBar;
