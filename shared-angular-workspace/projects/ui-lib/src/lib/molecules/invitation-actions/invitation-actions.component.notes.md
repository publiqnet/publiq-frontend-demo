# Invitation Actions Molecule

<h2>Selector</h2>
`<ui-invitation-actions></ui-invitation-actions>` 
  
 <h2>Attributes</h2>
 _inviter_ – the user that has invited another to a publication<br>

 <h2>Events</h2>
 _actionSelected_ – called when the user either accepted or rejected the invitation<br/>
 _inviterClicked_ – called when the invitor name link is clicked
 
 <h2>Example</h2>
` <ui-invitation-actions [inviter]="inviter" (actionSelected)="actionSelected($event)" (inviterClicked)="inviterClicked($event)"></ui-invitation-actions>`
 
 
 
