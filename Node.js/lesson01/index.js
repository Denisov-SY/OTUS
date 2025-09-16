function printTree(node, prefix = "") {
  // Ваш код здесь 
  let s = '';

  if (Array.isArray(node)) {
    node.forEach((el, idx) => {
      s = s + '\n' + prefix + printTree(el, prefix + "  " + (idx === node.length-1 ? "└" : "├"))
    });
  } else
    if (typeof node === 'object') {
      Object.keys(node).forEach((key) => {
        s = s + '\n' + prefix + '──' + printTree(node[key], prefix + "  ");
      });
    } else {
      s = node;
    }
  return s;
}

const data = {
  name: 1,
  items: [
    {
      name: 2,
      items: [{ name: 3 }, { name: 4 }]
    },
    {
      name: 5,
      items: [{ name: 6 }]
    }
  ]
};

console.log('finish: ' + printTree(data));
// console.log('finish: ' + printTree([1, 2, 3]));
// console.log('finish: ' + printTree({name: 3}));

// └── 1
//  ├── 2
//  │ ├── 3
//  │ └── 4
//  └── 5
//   └── 6