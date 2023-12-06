import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"



export function Overview({ data }: any) {
  const [treatedData, setTreatedData] = useState(data)

  useEffect(() => {
    setTreatedData(reformData())
  }, [data])

  const reformData = () => {
    const reformatedData: { name: string; total: any }[] = [] // Explicitly define the type of reformatedData
    data.forEach((element: any) => {
      console.log(element)
      reformatedData.push({
        name: element.period,
        total: Math.floor(Math.random() * 1000)
      })
    })
    return reformatedData
  }
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={treatedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={20}
      >
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          angle={-90}
          height={100}
          tickLine={false}
          axisLine={false}
          textAnchor="end"
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any) => `${value}DA`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  )
}
