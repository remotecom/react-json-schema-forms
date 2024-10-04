function Section({ level, children }) {
  return (
    <div
      className="flex justify-start items-start mb-2.5"
      style={{
        paddingLeft: level > 1 ? `${(level - 1) * 20}px` : "0px",
      }}
    >
      {children}
    </div>
  );
}

const DisplayResult = ({ data, level = 0 }) => {
  const renderData = (key, value, currentLevel) => {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return (
          <Section key={key} level={currentLevel}>
            <div className="font-bold break-words text-xs">{key}:</div>
            <div>
              {value.length > 0 ? (
                value.map((item, index) => (
                  <div
                    className="py-1"
                    key={index}
                    style={{
                      paddingLeft:
                        currentLevel > 1
                          ? `${(currentLevel - 1) * 20}px`
                          : "0px",
                    }}
                  >
                    {Object.entries(item).map(([k, v]) =>
                      renderData(k, v, currentLevel + 1)
                    )}
                  </div>
                ))
              ) : (
                <div className="text-primary break-words text-xs text-left ml-2.5">
                  Empty
                </div>
              )}
            </div>
          </Section>
        );
      } else {
        return (
          <div key={key}>
            <Section level={currentLevel}>
              <div className="font-bold break-words text-xs">{key}:</div>
            </Section>
            <div>
              {Object.entries(value).map(([k, v]) =>
                renderData(k, v, currentLevel + 1)
              )}
            </div>
          </div>
        );
      }
    } else {
      return (
        <Section key={key} level={currentLevel}>
          <div className="font-bold break-words text-xs">{key}:</div>
          <div className="text-primary break-words text-xs text-left ml-2.5">
            {value !== null && value !== undefined ? value.toString() : "Empty"}
          </div>
        </Section>
      );
    }
  };

  return (
    <div className="bg-blank p-5 overflow-x-auto max-w-full">
      {Object.entries(data).map(([key, value]) =>
        renderData(key, value, level)
      )}
    </div>
  );
};

export default DisplayResult;
