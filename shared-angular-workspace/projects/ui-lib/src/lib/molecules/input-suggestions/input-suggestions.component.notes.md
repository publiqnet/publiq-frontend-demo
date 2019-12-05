# Inout Suggestions Molecule

<h2>Selector</h2>
`<ui-input-suggestions></ui-input-suggestions>` 
  
 <h2>Attributes</h2>
 _suggestions_ – the suggestions object: `{value: string, text: string, avatarData: Avatar?}`<br>

 <h2>Events</h2>
 _onSelect_ – called when a suggestion is selected
 
 <h2>Example</h2>
` <ui-input-suggestions [suggestions]="suggestions" (onSelected)="suggestionSelected($event)"></ui-input-suggestions>`
 
 
 
