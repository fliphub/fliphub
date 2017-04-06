const eh = [
  {
    cool: 'nope',
  },
  {
    cool: 'yup',
  },
]
const nope = ['nope']
const coolBeans = eh
  .filter(data => !nope.includes(data.cool))
  .map(data => data.cool)

console.log(coolBeans)
