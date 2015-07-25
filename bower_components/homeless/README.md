# homeless

> Let' s help the "less" (fortunate) developers

homeless is a library that provides helpful functions for "Less" (Less.js)

deeply inspired by [more-or-less](https://github.com/pixelass/more-or-less)

## Examples

### each

```
@list: 'a', 'b', 'c';

.each(@list, {.callback(@item, @index) {
  .@{item} {
    item: @item;
    index: @index;
  }
}});
```

### for

```
.for(3, {.callback(@i) {
  .for(3, {.callback(@j) {
    .item-@{i}-@{j} {
      i: @i;
      j: @j;
    }
  }});
}});
```

### if

```
.if(isnumber(2), {
    .then(){
        test {
            bool: "pass";
        }
    }
    .else(){
        test {
            bool: "fail";
        }
    }
});
```

### index

```
@fruits: apple, banana, orange;

.test {
  .index(@fruits, apple);
  apple: @return;
}
```

### join

```
@letters: a, b, c, d, e, f, g;
.join(@letters, {
  .test {
    test: @return;
  }
});
```

### repeat

```
.repeat('div', ' > ', 3, {
  @{return} {
    /**/
  }
});
```
