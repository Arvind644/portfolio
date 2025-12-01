export type HeadTags = {
  title?: string;
  description?: string;
  noindex?: boolean;
  canonical?: string;
  keywords?: readonly string[] | string[];
  jsonLd?: object | object[];
  og?: {
    title?: string;
    type?: string;
    description?: string;
    image?: string;
    alt?: string;
  };
};
