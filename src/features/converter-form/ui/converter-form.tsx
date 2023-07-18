import CryptoConvert from 'crypto-convert'
import type { Pairs } from 'crypto-convert/dist/paris'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import type { SingleValue } from 'react-select'
import Select from 'react-select'

import { ControlledInput, IconComponent } from '@/shared/ui'

const convert = new CryptoConvert()

type OptionType = {
  value: keyof Pairs
  label: keyof Pairs
}

export const ConverterForm = () => {
  const { register, watch, setValue } = useForm()

  const [isReady, setIsReady] = useState(false)
  const [currencies, setCurrencies] = useState<(keyof Pairs)[]>()
  const [currenciesConvert, setCurrenciesConvert] = useState<{
    from: OptionType
    to: OptionType
  }>({
    from: {
      value: 'BTC',
      label: 'BTC',
    },
    to: {
      value: 'ETH',
      label: 'ETH',
    },
  })

  const options = useMemo(() => {
    return currencies?.map((item): OptionType => ({ value: item, label: item }))
  }, [currencies])

  const convertHandler = () => {
    if (!isReady) return '0'

    return (
      convert[currenciesConvert.from.value][currenciesConvert.to.value](
        watch('convert'),
      ) || '0'
    )
  }

  const selectHandler = (
    type: 'from' | 'to',
    selectedOption: SingleValue<OptionType>,
  ) => {
    setCurrenciesConvert((previousState) => {
      return { ...previousState, [type]: selectedOption }
    })
  }

  useEffect(() => {
    ;(async () => {
      await convert.ready()
      setCurrencies(convert.list.crypto.concat(convert.list.fiat) as (keyof Pairs)[])
      setIsReady(true)
    })()
  }, [])

  return (
    <form className="relative mt-4 max-w-fit" autoComplete="off">
      <ControlledInput
        register={register}
        name="convert"
        filters={['floatOnly']}
        setValue={setValue}
      />
      <div className="absolute mt-4 flex flex-col">
        {isReady ? (
          <>
            <div className="flex items-center gap-2">
              <Select
                value={currenciesConvert.from}
                onChange={(selectedOption) => selectHandler('from', selectedOption)}
                options={options}
                className="min-w-fit"
              />
              <p className="max-w-[15rem] truncate">{watch('convert') || '0'}</p>
            </div>
            <IconComponent name="equal" className="my-2 h-6 w-6 rotate-90 self-center" />
            <div className="flex items-center gap-2">
              <Select
                value={currenciesConvert.to}
                onChange={(selectedOption) => selectHandler('to', selectedOption)}
                options={options}
                className="min-w-fit"
                styles={{ menuList: (base) => ({ ...base, overflowX: 'hidden' }) }}
              />
              <p>{convertHandler()}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Skeleton className="h-full w-full" containerClassName="w-14 h-8" />
              <Skeleton className="h-full w-full" containerClassName="w-14 h-4" />
            </div>
            <IconComponent name="equal" className="my-2 h-6 w-6 rotate-90 self-center" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-full w-full" containerClassName="w-14 h-8" />
              <Skeleton className="h-full w-full" containerClassName="w-14 h-4" />
            </div>
          </>
        )}
      </div>
    </form>
  )
}
