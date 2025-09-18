function printTree(node, prefix = "") {
  let s = '';
  if (prefix.length === 0) { s = '└'; prefix = ' '; }

  if (Array.isArray(node)) {
    node.forEach((el, idx) => {
      // s = s + prefix + printTree(el, prefix + "  " + ((idx === node.length - 1) || (idx === 0) ? "└" : "├")) + '\n';
      const p = prefix + "├"; 
      s = s + prefix + printTree(el, prefix + " ");
    });
  } else
    if (typeof node === 'object') {
      Object.keys(node).forEach((key, idx) => {
        const p = prefix + "├"; //((idx === node.length - 1) ? "└" : "├");
        // const p = "".padEnd(idx) + prefix + ((idx === node.length - 1) ? "└" : "├") + '── ';
        s = s + printTree(node[key], p);
      });
    } else {
      s = '── ' + node + '\n';
    }
  return s.replaceAll("├ ", "│ ");
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
console.log('finish:');
console.log(printTree(data));
// console.log('finish: ' + printTree([1, 2, 3]));
// console.log('finish: ' + printTree({name: 3}));

// └── 1
//  ├── 2
//  │ ├── 3
//  │ └── 4
//  └── 5
//   └── 6