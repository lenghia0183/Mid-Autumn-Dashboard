import React, { useEffect } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import Icon from "../Icon";
import Image from "../Image";
import Pagination from "./../Pagination/index";
import { useParams } from "react-router-dom";
import { useGetCommentByProductId } from "../../service/https/comment";
import CommentListSkeleton from "../Skeletons/CommentListSkeleton";
import { useQueryState } from "../../hooks/useQueryState";
import Accordion from "./../Accordion/index";

const CommentList = ({}) => {
  const { page } = useQueryState();

  const { t } = useTranslation();
  const params = useParams();
  const {
    data: commentsData,
    isLoading,
    mutate: refreshComments,
    isValidating,
  } = useGetCommentByProductId({
    limit: 3,
    productId: params.productId,
    page: page,
  });

  const comments = commentsData?.comments;

  useEffect(() => {
    refreshComments();
  }, [page]);

  const renderStars = (ratings) => {
    const totalStars = 5;
    let stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(ratings)) {
        stars.push(
          <Icon key={i} name="starContained" color="emerald" size={1.5} />
        );
      } else if (i === Math.ceil(ratings) && ratings % 1 !== 0) {
        stars.push(<Icon key={i} name="starHalf" color="emerald" size={1.5} />);
      } else {
        stars.push(
          <Icon key={i} name="starEmpty" color="emerald" size={1.5} />
        );
      }
    }
    return stars;
  };

  if (isLoading || isValidating) return <CommentListSkeleton />;

  return (
    <div className="mt-10">
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="mb-4 p-4 border border-gray-200 rounded shadow-md flex space-x-4 bg-white-100"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Image
                src={comment?.userId?.avatar}
                className="rounded-full"
                width="xl:w-[70px] 50px"
                height="xl:h-[70px] 50px"
              />
            </div>
            {/* Nội dung comment */}
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg">
                    {comment.userId.fullname}
                  </p>
                  <p className="text-lg">{comment.userId.email}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-1 flex items-center">
                {renderStars(comment.rating)}
              </div>
              <Accordion minHeight="70px">
                <p className="mt-2 text-gray-700 text-lg">{comment.content}</p>
              </Accordion>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">{t("productDetail.noComments")}</p>
      )}

      <Pagination
        pageCount={commentsData?.totalPage}
        className="ml-auto mt-10"
      />
    </div>
  );
};

export default CommentList;
