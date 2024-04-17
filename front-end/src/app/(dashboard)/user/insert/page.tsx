'use client'
import { InsertUser } from '@/app/actions/user/insertUser'
import { validarCPF } from '@/data/function/validateCpf'
import { ValidateForm } from '@/data/function/validateForm'
import { ArrowLeft } from 'lucide-react'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function InsertUserPage() {
  const [returnError, setReturnError] = useState<string>('')
  const [status, setStatus] = useState(false)
  const router = useRouter()

  const hasNumber = /\d/
  const hasUpperCase = /[A-Z]/
  const hasLowerCase = /[a-z]/
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>_=+]/
  const hasMinLength = /^.{8,}$/

  const err = [
    'Senha precisa ter pelo menos um número.',
    'Senha precisa ter pelo menos uma letra maiúscula.',
    'Senha precisa ter pelo menos uma letra minúscula.',
    'Senha precisa ter pelo menos um símbolo.',
    'Senha precisa ter pelo menos 8 caracteres.',
    'Senhas não correspondem',
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validatePassword(password: any) {
    if (!hasNumber.test(password)) return err[0]
    if (!hasUpperCase.test(password)) return err[1]
    if (!hasLowerCase.test(password)) return err[2]
    if (!hasSymbol.test(password)) return err[3]
    if (!hasMinLength.test(password)) return err[4]
    return ''
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    setReturnError(validatePassword(data.password))
    console.log(e.currentTarget.email.value)

    const val = ValidateForm(
      e.currentTarget.email.value,
      e.currentTarget.firstName.value,
      e.currentTarget.lastName.value,
      e.currentTarget.DDD.value,
      e.currentTarget.phoneNumber.value,
      e.currentTarget.term_aceite.checked ? 1 : 0,
    )

    if (
      data.password === data.password_confirmation &&
      validatePassword(data.password) === '' &&
      validarCPF(String(data.cpf)) &&
      val === ''
    ) {
      const req = await InsertUser(data)
      setReturnError(req.message)

      if (req) {
        setStatus(false)
        alert('Cadastro feito com sucesso!')
        router.push('/user/login')
      }
      if (req.message)
        if (req.message.includes('The cpf has already been taken.')) {
          setReturnError('The cpf has already been taken.')
        } else if (req.message.includes('The email has already been taken.')) {
          setReturnError('The email has already been taken.')
        }
    } else if (!validarCPF(String(data.cpf))) {
      setReturnError('CPF invalido')
    } else if (
      data.password !== data.password_confirmation &&
      data.password === '' &&
      data.password_confirmation === ''
    ) {
      setReturnError('Senhas não correspondem')
    } else if (val !== '') {
      setReturnError(val)
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-[800px] w-full items-center">
      <Link
        href="/user/login"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Seu cadastro</p>
      <form onSubmit={handleSubmit}>
        <ReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_API_KEY_RECAPTCHA}
        >
          {returnError === 'Preencha os dados!' && (
            <span className="text-xs text-red-600">Preencha os dados!</span>
          )}
          <div className="flex flex-col mt-3 max-md:mt-3">
            <label htmlFor="firstName">
              Primeiro nome: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="lastName">
              Sobrenome: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="DDD">
              DDD: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="number"
              name="DDD"
              id="DDD"
              min="0"
              maxLength={999}
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="phoneNumber">
              Número de telefone: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              min={9999}
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          {returnError === 'Número de celular invalido.'}
          <div className="flex flex-col mt-3">
            <label htmlFor="cpf">
              CPF: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="number"
              name="cpf"
              id="cpf"
              min={9999}
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          {returnError === 'The cpf has already been taken.' && (
            <span className="text-xs text-red-600">CPF já cadastrado</span>
          )}
          {returnError === 'CPF invalido' && (
            <span className="text-xs text-red-600">CPF inválido.</span>
          )}
          <div className="flex flex-col mt-3">
            <label htmlFor="email">
              E-mail: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          {returnError === 'The email has already been taken.' && (
            <span className="text-xs text-red-600">E-mail já cadastrado</span>
          )}
          <div className="flex flex-col mt-3">
            <label htmlFor="password">
              Senha: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          {err.map(
            (erro, key) =>
              returnError === erro && (
                <span key={key} className="text-xs text-red-600">
                  {returnError}
                </span>
              ),
          )}
          <div className="flex flex-col mt-3">
            <label htmlFor="password_confirmation">
              Repetir senha: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-row gap-2 mt-3 items-center ">
            <input type="checkbox" name="term_aceite" id="term_aceite" />
            <Link href="">
              Termos de aceitação <span className="text-red-600">*</span>
            </Link>
          </div>
          <div className="flex justify-center">
            <button
              disabled={status}
              className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
            >
              Cadastrar
            </button>
          </div>
        </ReCaptchaProvider>
      </form>
    </div>
  )
}
