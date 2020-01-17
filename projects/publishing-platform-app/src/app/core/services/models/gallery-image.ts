export interface ImageOptions {
  thumbnail: string;
  uri: string;
  url: string;
}

export class Image {
  thumbnail: string;
  uri: string;
  url: string;

  constructor(options?: ImageOptions) {
    for (const i in options) {
      if (options.hasOwnProperty(i)) {
        this[i] = options[i] ? options[i] : '';
      }
    }
  }
}
