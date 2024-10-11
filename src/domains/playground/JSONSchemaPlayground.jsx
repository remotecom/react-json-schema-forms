import Form from "@/components/ui/form/Form";
import { Link, useSearchParams } from "react-router-dom";

import {
  addressDetailsSchema,
  employmentBasicInformationSchema,
  contractDetailsSchema,
} from "./schemas";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const queryToSchema = {
  "contract-details": contractDetailsSchema,
  "employment-basic-information": employmentBasicInformationSchema,
  "address-details": addressDetailsSchema,
};

function getSchemaFromQueryParam(schemaParam) {
  return Object.keys(queryToSchema).includes(schemaParam)
    ? schemaParam
    : "contract-details";
}

/**
 * Recursively maps the keys of an object using a provided function.
 *
 * @param {Object} obj - The object whose keys are to be mapped.
 * @param {Function} fn - A function that takes a key and returns a new key.
 * @returns {Object} A new object with the mapped keys.
 */
function mapKeys(obj, fn) {
  Object.keys(obj).reduce((result, current) => {
    if (typeof obj[current] == "object") {
      result[fn(current)] = mapKeys(obj[current], fn);
      return result;
    }
    result[fn(current)] = obj[current];
    return result;
  }, {});
}

export function JSONSchemaPlayground() {
  const [result, setResult] = useState();
  const [searchParams] = useSearchParams();
  const schemaParam = getSchemaFromQueryParam(searchParams.get("schema"));
  const schema = queryToSchema[schemaParam] || contractDetailsSchema;

  useEffect(() => {
    setResult(null);
  }, [schemaParam]);

  return (
    <div className="flex">
      <div className="grow-0 basis-1/4">
        <h3 className="h3">JSON Schemas</h3>
        <ul>
          <li
            className={cn(
              "text-sm mb-2",
              schemaParam === "contract-details" ? "text-primary" : ""
            )}
          >
            <Link to="/playground?schema=contract-details">
              Contract Details
            </Link>
          </li>
          <li
            className={cn(
              "text-sm mb-2",
              schemaParam === "employment-basic-information"
                ? "text-primary"
                : ""
            )}
          >
            <Link to="/playground?schema=employment-basic-information">
              Employment Basic Information
            </Link>
          </li>
          <li
            className={cn(
              "text-sm mb-2",
              schemaParam === "address-details" ? "text-primary" : ""
            )}
          >
            <Link to="/playground?schema=address-details">Address Details</Link>
          </li>
        </ul>
      </div>
      <div className="grow basis-2/4 flex flex-col items-center">
        <Form
          key={schemaParam}
          className="m-0"
          jsonSchema={schema}
          onSubmit={(values) => {
            const wrapObjectKeysWithSpan = mapKeys(
              values,
              (key) => `<span>${key}</span>`
            );
            setResult(wrapObjectKeysWithSpan);
          }}
        />
      </div>
      <div className="grow-0 basis-2/4 max-w-md overflow-x-auto">
        <div className="bg-blank p-4 text-xs">
          <pre>
            <code
              className="[&>span]:text-primary"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(result || {}, null, 4),
              }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}
