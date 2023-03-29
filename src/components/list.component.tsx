import { IQuestion } from "../interfaces/question.interface";
interface Props {
  item: IQuestion;
}
const ListComponent = ({ item }: Props) => {
  return (
    <>
      <div style={{ flex: 5 }}>
        <a
          style={{
            cursor: "pointer",
            color: "#0000EE",
            borderBottom: "1px solid #0000EE",
          }}
          onClick={() =>
            window.open(`/qustionContainer/${item.question_id}`, "_blank")
          }
        >
          {item.title}
        </a>
        <div style={{ display: "flex", textAlign: "center" }}>
          <div style={{ flex: 1 }}>
            <div>Score</div>
            <div style={{ color: item.score < 0 ? "red" : "black" }}>
              {item.score}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div>Answers</div>
            <div
              style={{
                border: item.answer_count > 0 ? "1px solid green " : "",
                backgroundColor: item.is_answered ? "green" : "",
              }}
            >
              {item.answer_count}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div>Viewed</div>
            <div>{item.view_count}</div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", flex: 1 }}>
        <img
          src={item.owner.profile_image}
          style={{ borderRadius: "50%", width: "40%" }}
        />
        <div>{item.owner.display_name}</div>
      </div>
    </>
  );
};
export default ListComponent;
