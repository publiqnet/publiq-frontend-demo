import { environment } from '../../../../environments/environment';

interface NotificationLangOptions {
  bodyJp: string;
  bodyEn: string;
}

export class Notification {

  langOptions: NotificationLangOptions;
  type: string;
  slug: string;
  date: Date;
  isRead: boolean = false;
  actionFrom: {
    image: string,
    first_name: string,
    last_name: string,
    slug: string,
    fullName: string
  };
  publication: {
    title: string,
    slug: string
  };

  constructor(data) {
    this.langOptions = (() => ({bodyEn: data.type['bodyEn'], bodyJp: data.type['bodyJp']}))();
    this.type = data.type.keyword;
    this.date = new Date(data.created_at * 1000);
    this.slug = data.id;
    this.isRead = data.isRead;

    this.actionFrom = {
      image: data.performer.image ? `${environment.backend}/${data.performer.image}` : data.performer.image,
      first_name: data.performer.firstName,
      last_name: data.performer.lastName,
      slug: data.performer.publicKey,
      fullName: ''
    };

    let name = '';
    if (data.performer.firstName) {
      name += data.performer.firstName;
    }
    if (name && data.performer.lastName) {
      name += ` ${data.performer.lastName}`;
    }

    this.actionFrom.fullName = name || data.performer.publicKey;

    this.publication = {
      title: data.publication.title,
      slug: data.publication.slug
    };
  }
}
