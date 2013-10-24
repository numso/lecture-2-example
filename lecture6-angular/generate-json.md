Generate your JSON
==================

### Instructions

Go to [http://www.json-generator.com/](http://www.json-generator.com/) and put the following code in to generate your test data.

```
[
  '{{repeat(30, 40)}}',
  {
    img: 'http://placehold.it/80x80',
    aNumber: function (idx) {
      var str = 'A';
      for (var i = 0; i < 8; ++i)
        str += Math.floor(Math.random() * 9);
      return str;
    },
    name: '{{firstName}} {{surname}}',
    age: '{{numeric(20, 40)}}',
    gender: '{{gender}}',
    email: '{{email(true)}}',
    phone: function (idx) {
      var str = '';
      for (var i = 0; i < 10; ++i)
        str += Math.floor(Math.random() * 9);
      return str;
    }
  }
]
```
