import { useSelector } from "react-redux";

const theme = useSelector((state: any) => state.Theme.theme);

const textColor = theme === "day" ? "black" : "white";

export { textColor };
