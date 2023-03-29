import { useCallback, useState } from "react";
import "./search.css";
import _ from "lodash";
interface Props {
  onFinish: (value: string) => void;
}
const SearchContainer = ({ onFinish }: Props) => {
  const [inname, setInname] = useState("");
  const query = useCallback(
    _.debounce((value: string) => {
      handleSubmit(value);
    }, 1000),
    []
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInname(e.target.value);
    query(e.target.value);
  };
  const handleSubmit = (value?: string) => {
    onFinish(value ?? inname);
  };
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            className="search-bar"
            name="inname"
            value={inname}
            onChange={handleChange}
          />
          <button className="search-btn" onClick={() => handleSubmit()}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};
export default SearchContainer;
