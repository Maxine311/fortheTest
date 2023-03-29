import { Tag } from "../interfaces/popularTag.interface";
import "./tag.css";
interface Props {
  tag: Tag;
  selectTag?: Tag;
  onClick: (value: Tag) => void;
}
const TagComponent = ({ tag, selectTag, onClick }: Props) => {
  return (
    <>
      <button
        className="tag"
        style={{
          background: selectTag?.name === tag.name ? "#61dafb" : "",
        }}
        onClick={() => onClick(tag)}
      >
        {tag.name}
      </button>
    </>
  );
};
export default TagComponent;
