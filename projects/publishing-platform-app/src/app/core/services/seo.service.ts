import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { SeoTags } from './models/seoTags';

@Injectable({
  providedIn: 'root',
})
export class SeoService {

  private defaultSeoTags: SeoTags;
  private descriptionMaxLength = 300;
  private descriptionMinLength = 10;

  constructor(
    private meta: Meta,
    private title: Title
  ) {
    this.defaultSeoTags = new SeoTags({
      title: 'PUBLIQ - Distributed Publishing Platform',
      description: 'PUBLIQ is a blockchain distributed media ecosystem owned, governed and operated by a global ' +
        'independent community, whose members enjoy unlimited potential of free expression, enterprising and full ' +
        'protection of their identity and IP rights',
      url: environment.main_site_url,
      image: `${environment.backend}/opengraph.png`,
      type: 'website'
    });
  }

  updateTags(tagList: SeoTags = this.defaultSeoTags) {
    this.title.setTitle(tagList.title);
    const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
    if (tagList.description && isHTML(tagList.description)) {
      tagList.description = tagList.description.replace(/<[^>]*>/g, '');
      if (tagList.description.length > this.descriptionMaxLength) {
        const limitedDescription = tagList.description.substring(0, this.descriptionMaxLength);
        tagList.description = this.sentenceCase(limitedDescription);
      }
    }
    this.meta.updateTag({name: 'og:title', content: tagList.title ? tagList.title : this.defaultSeoTags.title});
    this.meta.updateTag({name: 'title', content: tagList.title ? tagList.title : this.defaultSeoTags.title});
    this.meta.updateTag({name: 'og:description', content: tagList.description ? tagList.description : this.defaultSeoTags.description});
    this.meta.updateTag({name: 'description', content: tagList.description ? tagList.description : this.defaultSeoTags.description});
    this.meta.updateTag({name: 'twitter:title', content: tagList.title ? tagList.title : this.defaultSeoTags.title});
    this.meta.updateTag({name: 'twitter:description', content: tagList.description ? tagList.description : this.defaultSeoTags.description});
    this.meta.updateTag({name: 'og:type', content: tagList.type ? tagList.type : this.defaultSeoTags.type});
    this.meta.updateTag({name: 'og:url', content: `${tagList.url ? tagList.url : this.defaultSeoTags.url}`});
    this.meta.updateTag({name: 'og:image', content: tagList.image ? tagList.image : this.defaultSeoTags.image});
    this.meta.updateTag({name: 'twitter:image', content: tagList.image ? tagList.image : this.defaultSeoTags.image});
  }

  sentenceCase (data) {
    return (data.includes('.') && data.substring(0, data.lastIndexOf('.') + 1).length > this.descriptionMinLength) ? data.substring(0, data.lastIndexOf('.') + 1) : data;
  }
}
