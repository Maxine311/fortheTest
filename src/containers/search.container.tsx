import { useCallback, useEffect, useRef, useState } from "react";
import ListComponent from "../components/list.component";
import SearchContainer from "../components/search.component";
import TagComponent from "../components/tag.component";
import { Tag } from "../interfaces/popularTag.interface";
import "./base.css";
import {
  IQuestion,
  QuestionQueryParams,
} from "../interfaces/question.interface";
import {
  getPopularTagsData,
  getQuestionResultsAPI,
} from "../services/search.service";

const BaseContainer = () => {
  const observer = useRef<IntersectionObserver>();
  const [tags, setTags] = useState<Tag[]>([]);
  const [results, setResults] = useState<Map<string, IQuestion>>(new Map());
  const [selectTag, setSelectTag] = useState<Tag>();
  const [loading, setLoading] = useState<boolean>();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(1);
  const init = async () => {
    const tags = await getPopularTagsData({});
    await getQuestionData({ tagged: tags[0].name, page: 1 });
    setTags(tags);
    setSelectTag(tags[0]);
  };
  useEffect(() => {
    init();
  }, []);

  const handleTagClick = async (value: Tag) => {
    setSelectTag(value);
    setResults(new Map());
    getQuestionData({ tagged: value.name, page: 1 });
    setPageNumber(1);
  };

  const getQuestionData = async (params: QuestionQueryParams) => {
    setLoading(true);
    const resultData = await getQuestionResultsAPI({
      tagged: params.tagged,
      page: params.page,
    });
    setPageNumber(params.page);
    setHasMore(resultData.has_more);
    setLoading(false);
    setResults((prev) => {
      if (prev) {
        resultData.items.forEach((opt: IQuestion) =>
          prev.set(`${opt.question_id}`, opt)
        );
      }
      return new Map(prev);
    });
  };

  const lastResultElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          getQuestionData({
            tagged: selectTag?.name ?? tags[0].name,
            page: pageNumber + 1,
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSubmit = async (value: string) => {
    const tags = await getPopularTagsData({ inname: value });
    setResults(new Map());
    await getQuestionData({ tagged: tags[0].name, page: 1 });
    setTags(tags);
    setSelectTag(tags[0]);
  };
  return (
    <div style={{ margin: 10 }}>
      <SearchContainer onFinish={handleSubmit} />
      <div className="tags-container">
        {tags &&
          tags.map((tag, index) => (
            <TagComponent
              key={index}
              tag={tag}
              selectTag={selectTag}
              onClick={handleTagClick}
            />
          ))}
      </div>
      <div className="result-container">
        {results &&
          [...results].map(([id, result], index) => {
            if ([...results].length === index + 1) {
              return (
                <div
                  key={result.question_id}
                  className="result"
                  ref={lastResultElementRef}
                >
                  <ListComponent item={result} />
                </div>
              );
            } else {
              return (
                <div key={result.question_id} className="result">
                  <ListComponent item={result} />
                </div>
              );
            }
          })}
        <div>{loading && <span className="loader"></span>}</div>
      </div>
    </div>
  );
};
export default BaseContainer;
