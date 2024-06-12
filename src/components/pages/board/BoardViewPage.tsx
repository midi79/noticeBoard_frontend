import { useNavigate, useParams } from "react-router-dom";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Button from "../../common/widget/Button";
import styles from "./BoardViewPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../../common/util/http";
import { DateTimeConverter } from "../../common/util/datetime";

const BoardViewPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const { data, isError, error } = useQuery({
        queryKey: ["board", id],
        queryFn: () => getBoard(id),
    });

    const onEditClickHandler = () => {
        navigate("/pages/board/verify/password/" + id);
    };

    const onBackClickHandler = () => {
        navigate("/pages/board");
    };

    return (
        <div className={styles.board__view__wrapper}>
            <div className={styles.board__view__header}>
                <div className={styles.board__view__header__left}>
                    <div className={styles.board__view__header__title}>View notice</div>
                </div>
                <div className={styles.board__view__button}>
                    <Button title="Edit" onClickHandler={onEditClickHandler} type="button" />
                    <Button title="Back" onClickHandler={onBackClickHandler} type="button" />
                </div>
            </div>
            <div className={styles.board__view__content__wrapper}>
                <div className={styles.board__view__content__title}>{data ? data.title : null}</div>
                <div className={styles.board__view__content__user__date}>
                    <div>{data ? data.writer : null}</div>
                    <div>{data ? <DateTimeConverter date={data.editDate} /> : null}</div>
                </div>
                <div className={styles.board__view__content__editor}>
                    <QuillEditor theme="bubble" value={data ? data.bodyContent : null} readOnly={true} />
                </div>
                <div className={styles.board__view__tag}>{data ? data.tags.join(", ") : null}</div>
            </div>
            {isError && (
                <div className={styles.board__view__validation}>
                    {error.message || "Failed to save board. Please check your inputs and try again later."}
                </div>
            )}
        </div>
    );
};

export default BoardViewPage;
