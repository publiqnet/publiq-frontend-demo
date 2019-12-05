# User Single Molecule

<h2>Selector</h2>
`<ui-user-single></ui-user-single>` 

<h2>Types</h2>
_Followers_ <br>
_Pending_ <br>
_Notification_ <br>

<h2>Attributes</h2>
_Add Custom Class_ <br>
_Is Owner_ <br>
_Slug_ <br>
_Is Followed_ <br>
_User Single Data Snippet (Followers,Pending)_ <br>
`{
 "user": {
   "image": "http://via.placeholder.com/120x120",
   "first_name": "John",
   "last_name": "Doe",
   "fullName": "John Doe"
 },
 "isFollowing": false,
 "slug": "user_data"
}`<br>
_User Single Data Snippet (Notification)_ <br>
For User Data <br>
  `{
   "user": {
   "image": "http://via.placeholder.com/120x120",
   "first_name": "John",
   "last_name": "Doe",
   "fullName": "John Doe"
   },
   "isFollowing": false,
   "followMember": true,
   "slug": "user_data"
 }`<br>
For Notification Data <br>
`{
 "text": "Delete from publication",
 "value": "delete"
 }`<br>
For User Role Data <br>
`{
 "value": "Editor",
 "slug": "editor",
 "status": false
 },
 {
 "value": "Contributor",
 "slug": "contributor",
 "status": true
 }`<br>
_Click Event_

<h2>Example</h2>
`<ui-user-single [type]="" [className]="" [userData]="" (follow)="" (onFollowChange)="" (onNotificationClick)="" (onRoleClick)="" (onUserClick)="" [isOwner]="" [userNotificationData]="" [userRoleData]=""></ui-user-single>`



