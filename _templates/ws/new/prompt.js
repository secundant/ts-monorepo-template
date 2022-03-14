module.exports = [
  {
    type: 'select',
    name: 'type',
    message: 'Select scope of new package',
    choices: ['apps', 'libs']
  },
  {
    type: 'input',
    name: 'name',
    message: 'Name of package'
  }
];
