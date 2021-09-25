import styled from "styled-components";
import { Container, Row } from "reactstrap";

export const AppContainer = styled(Container)`
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
  font-size: 14px;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
`;

export const RowContainer = styled(Row)``;

export const RouteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: col;
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
`;

export const RouteContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 100%;
  width: 100%;
  min-width: 100%;
`;

export const MainContentContainer = styled.div`
  flex: 1;
`;
