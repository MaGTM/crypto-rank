import Skeleton from 'react-loading-skeleton'

interface ITableLoader {
  gridRowsWidth: string
  itemsCount: number
}

export const TableLoader = (props: ITableLoader) => {
  const { gridRowsWidth, itemsCount } = props

  return Array.from({ length: 20 }).map((_, index) => {
    return (
      <div
        key={index}
        className="mb-4 grid w-full"
        style={{
          gridTemplateColumns: gridRowsWidth,
        }}
      >
        {Array.from({ length: itemsCount }).map((i, rowIndex) => (
          <Skeleton key={rowIndex} containerClassName="w-[80%]" />
        ))}
      </div>
    )
  })
}
