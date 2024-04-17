'use client'
import { UpdatePasswordUser } from '@/app/actions/user/updatePassword'
import { BtnForm } from '@/components/btnForm'
import { ArrowLeft } from 'lucide-react'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function UpdatePassswordPage() {
  const [returnError, setReturnError] = useState<string>('')
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

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    setReturnError(validatePassword(data.password))
    if (
      data.password_new === data.password_confirmation &&
      validatePassword(data.password_new) === ''
    ) {
      const req = await UpdatePasswordUser(data)

      if (req.message === 'sucess') {
        alert('Senha alterada com sucesso!')
        router.push('/user')
      }
    }
    setReturnError('Senhas não correspondem')
    return ''
  }

  return (
    <div className="flex flex-col mx-auto justify-center h-[90%] w-full items-center">
      <Link
        href="/user/login"
        className="md:hidden flex items-center gap-1 text-sm mb-3 w-96 max-md:mt-24 max-md:w-80"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Link>
      <p className="text-xl mb-1 w-96 max-md:mb-0 max-md:w-80">Alterar senha</p>
      <form onSubmit={handleSubmit}>
        <ReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_API_KEY_RECAPTCHA}
        >
          <div className="flex flex-col mt-3">
            <label htmlFor="password">
              Senha atual: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-96 h-9 border border-zinc-400 rounded-[5px] max-md:w-80 px-2"
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="password_new">
              Nova senha: <span className="text-red-600">*</span>{' '}
            </label>
            <input
              type="password"
              name="password_new"
              id="password_new"
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
          <BtnForm title="Alterar" />
        </ReCaptchaProvider>
      </form>
    </div>
  )
}
