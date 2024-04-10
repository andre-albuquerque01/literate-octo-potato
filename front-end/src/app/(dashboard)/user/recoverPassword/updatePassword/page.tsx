'use client'
import { RecoverUpdatePassword } from '@/app/actions/user/recoverPassword/recoverUpdatePassword'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function UpdatePassword() {
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

    if (
      data.password === data.password_confirmation &&
      validatePassword(data.password) === ''
    ) {
      const req = await RecoverUpdatePassword(data)
      console.log(req)
      if (req.error === 'The payload is invalid.') {
        alert('Token expirado, tente recuperar a senha novamente')
        router.push('/user/recoverPassword/sendEmail')
      } else if (req.message === 'sucess') {
        setStatus(false)
        alert('Senha alterada!')
        router.push('/user/login')
      }
    }
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-[800px] w-full items-center">
      <div className="md:hidden h-20">
        <Link
          href="/user/sendEmail"
          className="flex items-center gap-1 text-sm w-96  max-md:w-80"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>
      </div>
      <p className="text-xl w-96 max-md:mb-0 max-md:w-80">Trocar senha</p>
      <form onSubmit={handleSubmit} className="w-96 max-md:w-80">
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
        <div className="flex justify-center">
          <button
            disabled={status}
            className="mx-auto font-semibold w-52 h-10 bg-red-600 text-zinc-50 text-xl rounded-[9px] mt-3 max-md:w-44 max-md:mb-5 hover:bg-red-500"
          >
            Recuperar
          </button>
        </div>
      </form>
    </div>
  )
}
