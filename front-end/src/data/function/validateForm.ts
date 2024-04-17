export function ValidateForm(
  email: string,
  firstName: string,
  lastName: string,
  DDD: number,
  phoneNumber: string,
  termAceite?: number,
) {
  if (email && firstName && lastName && DDD && phoneNumber) {
    return ''
  }
  if (termAceite) {
    return ''
  }
  if (phoneNumber) {
    phoneNumber = phoneNumber.replace(/\D/g, '')

    if (phoneNumber.length !== 9) {
      return 'Número de celular invalido.'
    }
  }
  return 'Preencha os dados!'
}
