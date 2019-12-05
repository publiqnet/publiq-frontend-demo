# Header Molecule

<h2>Selector</h2>
`<ui-header></ui-header>` 
  
 <h2>Attributes</h2>
  _Header Data_ <br>
 _User Data_ <br>
 _Notification Data_ <br>
 _Article Data_ <br>
  _Publication Data_ <br>
 _Add Custom Class_ <br>
 
 <h2>Data Snippets</h2>
 **Header Data**
`logo: 'https://stage-file.publiq.network/default/publiq.svg',
           isLogged: false,
           navigationLinks: [
             {text: 'Science', slug: 'science'},
             {text: 'History', slug: 'history'},
             {text: 'Geek', slug: 'geek'},
             {text: 'Gardens', slug: 'gardens'},
             {text: 'Entertainment', slug: 'entertainment'},
             {text: 'Education', slug: 'education'},
             {text: 'Outdoors', slug: 'outdoors'},
             {text: 'Quotes', slug: 'quotes'},
             {text: 'Holy Quraan', slug: 'quraan'},
           ],`
 **Notification Data**
 `{
                type: 'report',
                slug: '1.3.8',
                date: new Date(),
                isRead: false,
                actionFrom: {
                  image: 'http://via.placeholder.com/150',
                  first_name: 'Gagik',
                  last_name: 'Yeghiazaryan',
                  slug: '4.3.2'
                }
              },
              {
                type: 'following',
                slug: '1.3.8',
                date: new Date(),
                isRead: true,
                actionFrom: {
                  image: 'http://via.placeholder.com/150',
                  first_name: 'Harutyun',
                  last_name: 'Mnatsakanyan',
                  slug: '4.3.2'
                }
              }`
 **Article Data**
 `articleData: {
              user: object('avatar data', {
                fullName: '',
                image: 'http://via.placeholder.com/120x120'
              }),
              title: 'Article Title',
              slug: 'article',
              isLiked: boolean('Is Liked', false)
            }`
**Publication Data**
`publicationData: {
             publication: object('Publication', {
               fullName: 'Publication Title',
               slug: 'publication',
               image: 'http://via.placeholder.com/120x120'
             }),
             isFollowed: true,
             info: [
               {count: '11', property: 'Stories', icon: 'profile'},
               {count: '12', property: 'Views'},
               {count: '13', property: 'Members'},
               {count: '1K', property: 'Followers'},
             ]
           },`
**User Data**
`userData: {
             user: {
               fullName: 'Sarkis Andreyan',
               image: 'http://via.placeholder.com/120x120',
             },
             info: [
               {count: '11', property: 'Stories', icon: 'profile'},
               {count: '12', property: 'Views'},
               {count: '13', property: 'Members'},
               {count: '1K', property: 'Followers'},
             ]
           },`
 <h2>Example</h2>
` <ui-header (articleFollow)=""  (articleLiked)="" (navigationLink)="" (publicationFollow)="" (searchEvent)="" (userFollow)="" [headerData]="" [showSearchBar]=""></ui-header>`
 
 
 
