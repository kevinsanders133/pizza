import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Title = styled.h1 `
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    text-align: center
`;

const Hello = () => {
  return (
    <div>
        <Title>
            Hello World!
        </Title>
    </div>
  )
}

export default Hello;