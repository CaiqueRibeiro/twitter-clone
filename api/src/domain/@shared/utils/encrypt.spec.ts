import { Encrypt } from './encrypt'

describe('Encrypt unit tests', () => {
  it('should encrypt the password', async () => {
    const password = '123password321'
    const encryptedPassword = await Encrypt.encryptPassword(password)
    expect(encryptedPassword).not.toBe(password)
  })

  it('should be able to compare two passwords', async () => {
    const password = '123password321'
    const encryptedPassword =
      '$2b$10$PZDUnMzwVyUli9ZnVASzDuB5z3CN6.m61AnB7NDRgGlGBpD/1zANi'
    const expectedTrue = await Encrypt.compare(password, encryptedPassword)
    expect(expectedTrue).toBeTruthy()

    const wrongPassword = '123password'
    const expectedFalse = await Encrypt.compare(
      wrongPassword,
      encryptedPassword,
    )
    expect(expectedFalse).toBeFalsy()
  })
})
