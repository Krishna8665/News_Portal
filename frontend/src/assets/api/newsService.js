import API from "./index";

// Fetch all published news
export const getPublishedNews = () => API.get("/news");

// Fetch drafts (admin only)
export const getDraftNews = () => API.get("/news/drafts");

// Create a new draft
export const createDraftNews = (data) => API.post("/news", data);

// Publish a draft
export const publishNews = (id) => API.patch(`/news/${id}/publish`);
