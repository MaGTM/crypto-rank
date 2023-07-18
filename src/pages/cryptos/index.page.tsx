import Image from 'next/image'
import useScrollbarSize from 'react-scrollbar-size'

import { useGetCurrencies } from '@/shared/api'
import { TableLoader } from '@/shared/ui/loaders'

const tableHead = ['Name', 'Price USD', 'Circulating Supply', 'Market Cap', 'Category']

const CryptosPage = () => {
  const { currencies, isLoading } = useGetCurrencies()
  const { width: scrollWidth } = useScrollbarSize()

  const gridRowsWidth = `1.5fr repeat(${tableHead.length - 1}, 1fr)`

  return (
    <div className="px-8 text-xs">
      <div
        className="grid border-b border-gray-200"
        style={{
          gridTemplateColumns: gridRowsWidth,
          paddingRight: scrollWidth,
        }}
      >
        {tableHead.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <div className="mt-2 max-h-[80vh] w-full flex-col overflow-y-scroll">
        {isLoading && (
          <TableLoader gridRowsWidth={gridRowsWidth} itemsCount={tableHead.length} />
        )}
        {!isLoading &&
          currencies?.map((item) => {
            const formattedData = {
              name: `${item.name} ${item.symbol}`,
              priceUsd: item.values.USD.price,
              circulatingSupply: item.circulatingSupply,
              totalSupply: item.totalSupply,
              category: item.category,
            }

            return (
              <div
                key={item.id}
                className="mb-4 grid w-full"
                style={{
                  gridTemplateColumns: gridRowsWidth,
                }}
              >
                {Object.entries(formattedData).map(([key, value]) => {
                  if (key === 'name') {
                    return (
                      <div key={key} className="flex max-w-full gap-2">
                        <div className="relative h-4 w-4">
                          <Image
                            src={item.images['60x60']}
                            alt={`${item.symbol} logo`}
                            fill
                            placeholder="blur"
                            blurDataURL="/assets/blur-placeholder.png"
                          />
                        </div>
                        <p className="truncate pr-4">{value}</p>
                      </div>
                    )
                  }

                  return (
                    <p key={key} className="max-w-full truncate pr-4">
                      {value || '—'}
                    </p>
                  )
                })}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CryptosPage
