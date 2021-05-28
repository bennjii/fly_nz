import { createContext } from "react";

const ClientContext = createContext<{articleContent: { type: string; content: string; input: boolean; }[], setArticleContent: Function, setInformationUpdated: Function }>({
    articleContent: [],
    setArticleContent: () => {},
    setInformationUpdated: () => {}
});

export { ClientContext }