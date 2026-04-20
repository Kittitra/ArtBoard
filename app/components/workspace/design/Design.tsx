import React from 'react'


interface Version {
    id: string
    name: string
}

interface SubClass {
    name: string
    version: Version[]
}

interface Data {
    title: string
    subClass: SubClass[]  // ✅ array ของ SubClass
}

interface Props {
    items: { title: string }[]
    onSelect: (title: string) => void
    data: Data[]
    version: string
}

const Design = ({ items, data, version }: Props) => {
  return (
    <div>{version}</div>
  )
}

export default Design