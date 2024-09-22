import { GetBrags } from "../handles/HandleBrag";

export const fetchBrags = async () => {
  const res = await GetBrags(false);
  return res.brags.map((brag) => ({
    ...brag,
    brag_tags: Array.isArray(brag.brag_tags)
      ? brag.brag_tags.join(", ")
      : brag.brag_tags,
  }));
};
