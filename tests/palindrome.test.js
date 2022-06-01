const { palindrome } = require('../utils/for_testing')

// test unitario
test('palindrome checker', () => {
  const result = palindrome('juan')
  expect(result).toBe('nauj')
})
