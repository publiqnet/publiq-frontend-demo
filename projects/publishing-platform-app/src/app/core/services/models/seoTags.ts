export interface SeoTagsOptions {
  title?;
  description?;
  url?;
  image?;
  type?;
}

export class SeoTags {
  title;
  description;
  url;
  image;
  type;

  constructor(options?: SeoTagsOptions) {
    for (const i in options) {
      if (options.hasOwnProperty(i)) {
        this[i] = options[i];
      }
    }
  }
}
