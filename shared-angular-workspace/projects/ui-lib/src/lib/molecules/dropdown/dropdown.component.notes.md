# Dropdown Molecule

<h2>Selector</h2>
`<ui-dropdown></ui-dropdown>` 

<h2>Types</h2>
_Default_ <br>
_With Icon_ <br>
_Role_ <br>

<h2>Attributes</h2>
_Add Custom Class_ <br>
_Placeholder_ <br>
_isNone(Have none option or not)_ <br>
_Dropdown Data Snippet (With Icon, Default)_ <br>
` {
   "value": "Test value",
   "text": "Test text",
   "user": {
     "image": "http://via.placeholder.com/120x120",
     "first_name": "Test",
     "last_name": "News",
     "fullName": "Test News"
   }
 }`<br>
_Dropdown Data Snippet (Role)_ <br>
` {
     "value": "Editor",
     "slug": "editor",
     "status": true
   },
   {
     "value": "Contributor",
     "slug": "contributor",
     "status": false
   }`<br>
_Click Event_

<h2>Example</h2>
`<ui-dropdown [type]="'role'" [roleData]='customData' (onRoleChange)="_onRoleClick($event)"></ui-dropdown>`



