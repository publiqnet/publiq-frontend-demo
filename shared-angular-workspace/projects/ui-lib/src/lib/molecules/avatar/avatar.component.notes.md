# Avatar Molecule

<h2>Selector</h2>
`<ui-avatar></ui-avatar>` 
  
 <h2>Sizes</h2>
  _X-small_ <br>
  _X-smallPublication_ <br>
  _Small_ <br>
  _Medium_ <br>
  _Medium Publication_ <br>
  _Large_ <br>
  
 <h2>Attributes</h2>
 _is Squaric_ <br>
 _Add Custom Class_ <br>
 _Avatar Data Snippet_ <br>
`{
  "fullName": "Sarkis Andreyan",
  "image": "http://via.placeholder.com/120x120"
}`<br>
_Click Event_
 
 <h2>Example</h2>
` <ui-avatar [size]="'large'" [avatarData]="userData.user" (click)="userInfo(this.customData);" [className]="'custom-class'"></ui-avatar>`
 
 
 
