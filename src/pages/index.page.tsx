import { ConverterForm } from '@/features/converter-form'

const Home = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <h1>Cryptocurrency Converter Calculator</h1>
      <ConverterForm />
    </div>
  )
}

export default Home
