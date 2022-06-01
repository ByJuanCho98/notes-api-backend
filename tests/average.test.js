const { average } = require('../utils/for_testing')

describe('average', () => {
  test('testing', () => {
    const result = average([5, 3])
    expect(result).toBe(4)
  })

  test('of one value', () => {
    const result = average([1])
    expect(result).toBe(1)
  })

  test('of undefined expects to be 0', () => {
    const result = average()
    expect(result).toBe(0)
  })
})
