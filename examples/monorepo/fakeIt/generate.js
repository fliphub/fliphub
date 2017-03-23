const fs = require('fs')
const faker = require('faker')
const flipfile = require('flipfile')
const fliplog = require('fliplog')

function fakeIt(i) {
  return {
    _id: faker.random.uuid(),
    gid: faker.random.uuid(),
    index: i,
    age: faker.random.number(),
    balance: '$' + faker.random.number(),
    name: faker.name.findName(),
    isActive: faker.random.boolean(),
    email: faker.internet.email(),
    card: faker.helpers.createCard(),
    image: faker.image.imageUrl(),
    eyeColor: faker.internet.color(),
    fave: faker.random.word(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    phone: faker.phone.phoneNumber(),
    company: faker.company.bs(),
  }
}

const es = 5
const ext = 'js'
const iterations = 3
const data = []
for (var i = iterations; i >= 0; i--) data.push(fakeIt(i))
const jsonData = JSON.stringify(data, null, 2)
console.log(jsonData)

function writeFakes() {
  // const content = `export default () => {}`
  const content = `module.exports = () => {return ${jsonData}}`
  for (var i = iterations; i >= 0; i--)
    flipfile.write(__dirname + `/src/silly${i}.${ext}`, content)
}

function makeEntry() {
  let content = ''
  let moduleExports = `\nmodule.exports = {\n`
  for (var i = iterations; i >= 0; i--) {
    const file = `silly${i}`
    if (es === 6) content += `import ${file} from './${file}'\n`
    else content += `const ${file} = require('./${file}')\n`

    moduleExports += `\t${file}, `
  }
  moduleExports += '\n}'
  content += moduleExports

  flipfile.write(__dirname + '/src/index.' + ext, content)
}

writeFakes()
makeEntry()
