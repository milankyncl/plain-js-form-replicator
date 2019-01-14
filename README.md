# PlainJS Form replicator #

**jQuery plugin converted to PlainJS version**

PlainJS Form replicator plugin for easy form control with possibility to duplicate form groups.

## Configuration options ##

**firstItemUndeletable**

Set if first item is deletable or not.

```javascript
default: true
options: boolean (true | false)
```

**onHide**

Callback executed after clicking ```[data-group-remove-item]``` element.

```javascript
default: function(){ this.style.display = 'none' }
options: function(item){ // your code here }
arguments:
  item: HTMLElement of item to be hidden
```

**onShow**

Callback executed after clicking ```[data-group-add-item]``` element.

```javascript
default: function(){ this.style.display = 'block' }
options: function(item){ // your code here }
arguments:
  item: HTMLElement of item to be showed
```