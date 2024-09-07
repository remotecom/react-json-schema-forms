import React from 'react';
import { ResultContainer, Section, Key, ArrayItem,Value } from '../App.styled.js'; 

const DisplayResult = ({ data, level = 0 }) => {
  const renderData = (key, value, currentLevel) => {
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return (
          <Section key={key} level={currentLevel}>
            <Key>{key}:</Key>
            <div>
              {value.length > 0 ? (
                value.map((item, index) => (
                  <ArrayItem key={index} level={currentLevel}>
                    {Object.entries(item).map(([k, v]) => renderData(k, v, currentLevel + 1))}
                  </ArrayItem>
                ))
              ) : (
                <Value>Empty</Value>
              )}
            </div>
          </Section>
        );
      } else {
        return (
          <div key={key}>
            <Section level={currentLevel}>
              <Key>{key}:</Key>
            </Section>
            <div>
              {Object.entries(value).map(([k, v]) => renderData(k, v, currentLevel + 1))}
            </div>
          </div>
        );
      }
    } else {
      return (
        <Section key={key} level={currentLevel}>
          <Key>{key}:</Key>
          <Value>{value !== null && value !== undefined ? value.toString() : 'Empty'}</Value>
        </Section>
      );
    }
  };

  return (
    <ResultContainer>
      {Object.entries(data).map(([key, value]) => renderData(key, value, level))}
    </ResultContainer>
  );
};

export default DisplayResult;
