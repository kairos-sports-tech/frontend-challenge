import React, { useState } from "react";
import styled from "styled-components";
import { makePerson } from "./dummyData";
import "./App.css";

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  max-width: 500px;
`;

const AddIcon = (props) =>
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M50.6666 34.6667H34.6666V50.6667H29.3333V34.6667H13.3333V29.3334H29.3333V13.3334H34.6666V29.3334H50.6666V34.6667Z"/>
  </svg>;


function App() {
  const [users, setUsers] = useState(() => [makePerson(), makePerson(), makePerson()]);
  return (
    <div className="App">
      <Card>
        <div>
          <button onClick={() => {
            setUsers(users => [makePerson(), ...users]);
          }}><AddIcon/></button>
          <div>Add yours</div>
        </div>
        {users.map(user => {
          return (
            <div>
              <img src={user.avatarUrl} alt=""/>
              <div>{user.firstName}</div>
              <div>{user.lastName}</div>
              <div>{user.lastSeenMinutesAgo}m ago</div>
            </div>);
        })}
      </Card>
    </div>
  );
}

export default App;
