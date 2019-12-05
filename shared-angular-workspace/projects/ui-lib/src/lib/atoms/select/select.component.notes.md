# Select Atom

<h2>Selector</h2>
`<ui-select></ui-select>`
 
 <h2>Attributes</h2>
 _Multiple_ <br>
 _Add Custom Class_ <br>
 _Value Snippet_ <br> 
  `{
     "value": "test key",
     "text": "test value"
  }`
 
 <h2>Example</h2>
` <ui-select [multiple]="true" [className]="'custom-class'" *ngFor='let item of customData' [value]='item.value'>{{item.text}}</ui-select>`
 
 
 
