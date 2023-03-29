import { useEffect, useState } from "react";
import "./base.css";
import { IQuestion } from "../interfaces/question.interface";
import { getQuestionResultByIdAPI } from "../services/search.service";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const QuestionContainer = () => {
  let { id } = useParams();
  const [data, setData] = useState<IQuestion>();

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  const getData = async (id: string) => {
    const resultData = await getQuestionResultByIdAPI(id);
    setData(resultData.items[0]);
  };

  return (
    <div className="m-10">
      <h3>Question:{data?.title}</h3>
      <div className={"result"}>
        <div className="m-10">
          Create Date :{" "}
          {data?.creation_date
            ? dayjs(data?.creation_date * 1000).format("YYYY/MM/DD")
            : "-"}
        </div>
        <div className="m-10">Viewed : {data?.view_count}</div>
      </div>

      <span>
        Want to know more detail?{" "}
        <a href={`${data?.link}`}>Go To stackoverflow</a>
      </span>

      <div style={{ display: "flex" }}>
        <div
          style={{
            margin: 15,
          }}
        >
          Tags:
        </div>

        {data?.tags &&
          data?.tags.map((tag, index) => (
            <div
              style={{
                margin: 10,
                border: "1px solid black",
                borderRadius: 5,
                padding: 5,
              }}
            >
              {tag}
            </div>
          ))}
      </div>
    </div>
  );
};
export default QuestionContainer;
