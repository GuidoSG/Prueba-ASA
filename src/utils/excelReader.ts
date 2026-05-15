import * as XLSX from 'xlsx'

export interface ClientRecord {
  client_id: number
  name: string
  age: number
  salary: number
}

export interface ClientMetrics {
  totalClients: number
  avgAge: number
  avgSalary: number
  totalSalary: number
  annualGrowth: number
}

export async function calculateMetrics(): Promise<ClientMetrics> {
  const response = await fetch('/data/clientes_andes_insight.xlsx')
  const buffer = await response.arrayBuffer()
  const wb = XLSX.read(buffer, { type: 'array' })
  const sheet = wb.Sheets[wb.SheetNames[0]]
  const data = XLSX.utils.sheet_to_json<ClientRecord>(sheet)

  const totalClients = data.length

  // Calcular promedio de edad de todos los registros
  const totalAge = data.reduce((sum, r) => sum + (r.age || 0), 0)
  const avgAge = totalAge / totalClients

  const totalSalary = data.reduce((sum, r) => sum + (r.salary || 0), 0)
  const avgSalary = totalSalary / totalClients

  return {
    totalClients,
    avgAge: Math.round(avgAge * 10) / 10,
    avgSalary: Math.round(avgSalary * 100) / 100,
    totalSalary: Math.round(totalSalary * 100) / 100,
    annualGrowth: 32,
  }
}
