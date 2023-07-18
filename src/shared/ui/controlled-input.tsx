import clsx from 'clsx'
import React from 'react'
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form'

type Filters = 'floatOnly'

interface IControlledInputProperties {
  register: UseFormRegister<any>
  name: string
  filters: Filters[]
  setValue: UseFormSetValue<any>
}

export const ControlledInput = (props: IControlledInputProperties) => {
  const { register, name, filters, setValue } = props

  return (
    <input
      className={clsx(
        'rounded-lg border border-gray-200 px-2 py-1 outline-none',
        'focus:border-white focus:bg-blue-100 focus:shadow-input-shadow focus:duration-300 focus:hover:border-gray-200',
      )}
      type="text"
      {...register(name, {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          if (!filters) return

          if (filters.includes('floatOnly')) {
            const newValue = e.target.value
              .replaceAll(/[^\d.]/g, '')
              .replaceAll(/(\..*?)\..*/g, '$1')

            e.target.value = newValue
            setValue(name, newValue)
          }
        },
      })}
    />
  )
}
