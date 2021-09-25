import styled from "styled-components";

export const BasicButton = styled.button`
  color: #000000;
  width: 100%;
  justify-content: center;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #367fa9;
  border-radius: 3px;
  color: white;
  background: #3c8dbc;
  :hover {
    background-color: #367fa9;
    border-color: #204d74;
  }
  :disabled {
    background-color: #aeaca1;
    pointer-events: none;
  }
`;

export const AddButton = styled.button`
  color: #000000;
  width: 100%;
  justify-content: center;
  padding: 5px;
  font-size: 16px;
  border-radius: 10px;
  color: white;
  background: #454440;
  border-color: #aeaca1;
  :hover {
    background: green;
  }
`;

export const RemoveButton = styled.button`
  color: #000000;
  width: 100%;
  justify-content: center;
  padding: 5px;
  font-size: 16px;
  border-radius: 10px;
  color: white;
  background: #aeaca1;
  border-color: #aeaca1;

  :hover {
    background: red;
  }
`;

export const NavButton = styled.button`
  align-items: center;
  color: #000000;
  font-size: 20px;
  color: white;
  justify-content: center;
  border-radius: 10px;
  border-color: #aeaca1;
  background: #454440;
  :hover {
    background-color: #aeaca1;
  }
`;
