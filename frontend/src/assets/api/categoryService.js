import API from "./index";

export const getCategories = () => API.get("/categories");
export const createCategory = (name) => API.post("/categories", { name });
