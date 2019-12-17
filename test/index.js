const cute = require('../node')

let o1 = {
   foo: 9,
   bar: 12,
   now: "2019-11-29T15:05:13.871Z",
   reservedWord: true,
   coco: null,
   hi: x => x+2,
   myObject: {
      x: [
         5,
         {
            z: 5312,
            theta: 321
         },
         {
            z: 45,
            theta: 868
         },
         "Yo"
      ],
      hi: "Hi Foo"
   }
}

let o2 = {
	b: 5,
	d: {
		a:3213,
		b: 31321,
		c: 32321
	},
	e: [8,9,5,4,3,2,1],
	c: [4, 5],
	a: 32321
}

cute.log(o1)
