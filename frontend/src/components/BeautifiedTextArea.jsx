import React,{ useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';

const Container=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1e1e1e;
  color: #d4d4d4;
`;

const TextArea=styled.textarea`
  width: 90%;
  height: 80vh;
  background-color: #1e1e1e;
  color: #d4d4d4;
  border: 1px solid #555;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
  resize: none;
  outline: none;
`;

const BeautifiedTextArea=(props) => {
    const [text,setText]=useState('');
    const {
        onChange,
        value
    }=this.props;
    return (
        <Container>
            <TextArea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your code here..."
            />
            <SyntaxHighlighter language="javascript" style={atomDark}>
                {text}
            </SyntaxHighlighter>
        </Container>
    );
};

export default BeautifiedTextArea;
