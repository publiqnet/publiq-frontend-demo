# Dropdown List Molecule

<h2>Selector</h2>
`<ui-dropdown-list></ui-dropdown-list>` 

<h2>Types</h2>
_Default_ <br>
_Header Avatar Dropdown_ <br>
_Tag Menu_ <br>
_Notification List_ <br>
_Channel Type_ <br>

<h2>Attributes</h2>
_Add Custom Class_ <br>
_Delta_ <br>
_Position_ <br>
_Icon_ <br>
_Dark Theme_ <br>
_List Class Name_ <br>
_Opener Class Name_ <br>
_Dropdown List Data Snippet (Default)_ <br>
` {
     "icon": "reposition",
     "text": "Reposition",
     "value": "reposition"
   },
   {
     "icon": "delete",
     "text": "Delete",
     "value": "delete",
     "seperator": true
   }`<br>
_Dropdown List Data Snippet (Header Avatar Dropdown)_ <br>
` {
   "icon": "pbq",
   "text": "2000 PBQ",
   "value": "new-story",
   "inner": {
     "text": "Wallet",
     "icon": "arrow-right"
   },
   "seperator": true
 },
 {
   "icon": "new-story",
   "text": "New story",
   "value": "new-story"
 },`<br>
_Dropdown Data Snippet (Tag menu)_ <br>
` {
   "text": "Science",
   "slug": "science"
   },`<br>
_Dropdown Data Snippet (Channel Type)_ <br>
`<br>
_Click Event_

<h2>Example</h2>
`<ui-dropdown-list [type]="" [icon]="" (onItemSelect)="" [position]="" [items]="" [delta]="" [isChannelPrivate]="" [isDark]="" [listClassName]="" [openerClassName]="" ></ui-dropdown-list>`



