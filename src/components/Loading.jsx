import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faExclamationCircle,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import clsx from "clsx";

const Loading = ({ state = "none", message = "Ачаалж байна", setLoading }) => {
    useEffect(() => {
        if (state === "done" || state === "warn") {
            const timer = setTimeout(() => {
                setLoading?.({ state: "none", message: "" });
            }, 3000); // 2 секунд
            return () => clearTimeout(timer); // Цэвэрлэх
        }
    }, [state]);

    const getColor =
        state === "warn"
            ? "bg-[#f44336] border-[#f44336]"
            : state === "done"
            ? "bg-[#4CAF50] border-[#4CAF50]"
            : "bg-[#287df0] border-[#287df0]";

    if (state === "none") return null;

    const handleClick = () => {
        setLoading?.({ state: "none", message: "" });
    };

    return (
        <>
            {message && (
                <div
                    className="flex-1 inset-0 bg-transparent fixed top-0 flex justify-center h-screen z-[1500]"
                    onClick={state === "done" ? handleClick : undefined}
                >
                    <div
                        className={clsx(
                            "flex items-center rounded-b-md px-4 h-[30px]",
                            getColor,
                            (state === "done" || state === "warn") && "gap-2"
                        )}
                    >
                        <p className="text-[13px] font-semibold text-white">
                            {state === "loading"
                                ? message || "Ачаалж байна"
                                : state === "doing"
                                ? message || "Үйлдлийг гүйцэтгэж байна"
                                : state === "done"
                                ? message || "Амжилттай илгээгдлээ"
                                : state === "warn"
                                ? message || "Алдаа гарлаа"
                                : null}
                        </p>
                        <FontAwesomeIcon
                            icon={
                                state === "done"
                                    ? faCheckCircle
                                    : state === "warn"
                                    ? faExclamationCircle
                                    : faSpinner
                            }
                            spin={state !== "done" && state !== "warn"} // loading үед эргэлддэг
                            style={{
                                width: state === "done" ? 18 : 18,
                                height: state === "done" ? 18 : 18,
                                color: "white",
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Loading;
