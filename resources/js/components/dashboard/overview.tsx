import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"



export function Overview({ data }: any) {
  const [treatedData, setTreatedData] = useState(data)

  useEffect(() => {
    setTreatedData(reformData())
  }, [data])

  const reformData = () => {
    const reformatedData: { name: string; total: any }[] = [] // Explicitly define the type of reformatedData
    for (const key in data) {
      reformatedData.push({
        name: key,
        total: data[key],
      })
    }
    reformatedData.sort((a, b) => a.name.localeCompare(b.name))
    return reformatedData
  }
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={treatedData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value : any) => `${value}DA`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
