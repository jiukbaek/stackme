import { useState } from "react";

const useInput = (defaultVal = "") => {
  const [value, setValue] = useState(defaultVal);
  const onChange = e => {
    setValue(e.target.value);
  };

  return { value, setValue, onChange };
};

export default useInput;
