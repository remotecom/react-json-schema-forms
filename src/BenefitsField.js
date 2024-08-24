import styled from "styled-components";
import { useState } from "react";
import {
  Field as FormikField,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import {
  Label,
  Error,
  FieldsetRaw,
  FieldsetRadioStyled,
} from "./App.styled.js";

import { fieldsMapConfig, Description } from "./FormFields.js";

function SubGroupsToggle({ subGroups, onPress, active }) {
  if (!subGroups) return null;

  return (
    <SubGroupBtns>
      {subGroups.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onPress(id)}
          aria-pressed={id === active}
        >
          {label}
        </button>
      ))}
    </SubGroupBtns>
  );
}

function BenefitGroup({ name, label, options, ...props }) {
  const subGroups = props.meta?.subGroups;
  const [currentSubGroupId, setSubGroupIdActive] = useState(
    // When subGroups exist, set the first as the active one
    subGroups?.[0].id || null
  );
  const currentSubGroup = subGroups?.find(
    (s) => s.id === currentSubGroupId
  )?.optionValues;

  // [MT]/1 Identify the group type by checking its options's meta.types.
  // More comments inside the function.
  const groupMainType = getMainType(options[0].meta.types);

  return (
    <FieldsetRadioStyled key={name}>
      <BenefitHeader>
        <Label as="legend">
          {/* [MT]/2 An example of setting a custom icon for the group. */}
          {<IconFancy>{typesIcons[groupMainType]}</IconFancy>} {label}
        </Label>
        <SubGroupsToggle
          subGroups={subGroups}
          active={currentSubGroupId}
          onPress={setSubGroupIdActive}
        />
      </BenefitHeader>
      <Description description={props.description} />

      <Error>
        <FormikErrorMessage name={name} />
      </Error>

      {options.map(({ value, meta, ...optsProps }) => {
        const isNotPartOfSubGroup =
          currentSubGroup && !currentSubGroup.includes(value);

        if (isNotPartOfSubGroup) {
          return null;
        }

        if (!meta) {
          // Options without meta (eg "No" or another simpler tier)
          return (
            <Tier key={value}>
              <FormikField type="radio" name={name} value={value} />
              <div>
                <span htmlFor={value}>{optsProps.label}</span>
                <Description text={optsProps.description} />
              </div>
            </Tier>
          );
        }

        const {
          providerName,
          detailsUrl,
          displayCost,
          tierName,
          displayCostDisclaimer,
        } = meta;

        return (
          <Tier key={value}>
            <FormikField type="radio" name={name} value={value} />
            <div>
              <TierTitle>
                {tierName}
                <TierCost>
                  {displayCost}{" "}
                  {displayCostDisclaimer && (
                    <Tooltip text={displayCostDisclaimer} />
                  )}
                </TierCost>
              </TierTitle>
              <TierDescription>
                <b>{providerName}:</b>{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: optsProps.description }}
                />{" "}
                {detailsUrl && (
                  <a href={detailsUrl} target="_blank" rel="noreferrer">
                    Learn more
                  </a>
                )}
              </TierDescription>
            </div>
          </Tier>
        );
      })}
    </FieldsetRadioStyled>
  );
}

// The list is not completed, reach to Remote for the full list.
const mainTypes = ["health", "pension", "employee-assistance-program"];

const typesIcons = {
  health: "🩺",
  pension: "🧓",
  "employee-assistance-program": "❤️",
};

function getMainType(tierTypes) {
  // [MT]/3 Get the Group's main type by checking one of its tiers's types (options)
  if (tierTypes.length === 1) {
    return tierTypes[0];
  }

  // A benefit-group might have multiple types, so we need to look for the main one.

  // Note: We are considering to add a single main type to the group root
  // in a future release, for easier DX.
  return tierTypes.find((t) => mainTypes.includes(t));
}

export function FancyBenefitComponent(props) {
  console.log("Benefits props", props);
  // Multi-Benefits are always a Fieldset with multiple Groups
  if (props.inputType === "fieldset") {
    return (
      <div>
        <FieldsetRaw>
          <FieldsetTitle>{props.label}</FieldsetTitle>
          <Description text={props.description} />

          {props.fields.map((field) => {
            if (!field.options) {
              // If for some reason, one of the sub-fields
              // is not a radio/select, fallback to a default field
              // This is not a case yet at Remote, but might be in the future.
              const SubFieldComponent = fieldsMapConfig[field.inputType];
              return <SubFieldComponent key={field.name} {...field} />;
            }

            return (
              <BenefitGroup
                key={field.name}
                {...field}
                // For Formik to pass nested values properly
                name={`${props.name}.${field.name}`}
              />
            );
          })}
        </FieldsetRaw>
      </div>
    );
  }

  // Single-Benefits only has one group
  return <BenefitGroup {...props} />;
}

// ======================
//         Styles
// ======================

function Tooltip({ text }) {
  // NOTE: Please, use an accessible Tooltip.
  return (
    <span title={text} role="img" aria-label="Info">
      ℹ️
    </span>
  );
}

const FieldsetTitle = styled.legend`
  font-weight: 600;
  margin-bottom: 8px;
`;

const Tier = styled.label`
  width: 100%;
  display: flex;
  gap: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px 8px;

  & + & {
    margin-top: 8px;
  }
`;

const TierTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  gap: 16px;
  margin-bottom: 4px;
`;

const TierCost = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
`;

const TierDescription = styled.span`
  margin-top: 6px;
  font-size: 0.8rem;

  b {
    font-weight: inherit;
    color: #000;
  }

  color: #333;
`;

const BenefitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  align-items: baseline;
`;

const IconFancy = styled.span`
  outline: 1px dashed red;
  padding: 3px;
  border-radius: 3px;
`;

const SubGroupBtns = styled.div`
  & button {
    position: relative;
    background-color: white;
    min-height: 30px;
    margin-left: -1px;
    border-width: 2px;
    border: 1px solid gray;
    padding: 0px 16px;
    cursor: pointer;

    &:first-child {
      border-radius: 8px 0 0 8px;
    }

    &:last-child {
      border-radius: 0 8px 8px 0;
    }

    &:hover {
      filter: saturate(1.4);
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
    &:focus-visible {
      z-index: 1;
      outline: none;
      box-shadow: rgb(255 255 255) 0px 0px 0px 3px,
        rgb(98 77 227) 0px 0px 0px 5px;
    }

    &[aria-pressed="true"] {
      background: #eef7ff;
      color: #045fff;
    }
  }
`;
