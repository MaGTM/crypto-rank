import dynamic from 'next/dynamic'
import React from 'react'

const equal = dynamic(() => import('public/assets/icons/equal-icon.svg'))

const iconTypes = {
  equal,
}

export type IconsTypes = keyof typeof iconTypes

export interface IIconComponentProperties extends React.SVGAttributes<SVGElement> {
  name: IconsTypes
}

export const IconComponent = ({ name, ...props }: IIconComponentProperties) => {
  const Icon = iconTypes[name]
  return <Icon {...props} />
}
