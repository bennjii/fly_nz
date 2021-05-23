import { createContext } from "react";

const ClientContext = createContext<{articleData: { type: string; content: string; input: boolean; }[], setArticleData: Function}>({
    articleData: [],
    setArticleData: () => {}
});

export { ClientContext }