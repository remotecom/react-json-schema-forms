import PropTypes from "prop-types";

/**
 * Recursively maps the keys of an object using a provided function.
 *
 * @param {Object} obj - The object whose keys are to be mapped.
 * @param {Function} fn - A function that takes a key and returns a new key.
 * @returns {Object} A new object with the mapped keys.
 */
function mapKeys(obj, fn) {
  return Object.keys(obj ?? {}).reduce((result, current) => {
    if (typeof obj[current] == "object") {
      result[fn(current)] = mapKeys(obj[current], fn);
      return result;
    }
    result[fn(current)] = current.includes("token") ? "******" : obj[current];
    return result;
  }, {});
}

export function Result(data = {}) {
  const wrapObjectKeysWithSpan = mapKeys(data, (key) => `<span>${key}</span>`);

  return (
    <div className="bg-blank p-4 text-xs max-w-full overflow-x-auto">
      <pre>
        <code
          className="[&>span]:text-primary"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(wrapObjectKeysWithSpan || {}, null, 4),
          }}
        />
      </pre>
    </div>
  );
}

Result.propTypes = {
  data: PropTypes.object.isRequired,
};
