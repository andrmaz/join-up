import instance from '../db/sql'

const trxProvider = instance.transactionProvider()

async function select<T>(
  table: string,
  column = '*',
  filter = {}
): Promise<T[]> {
  const trx = await trxProvider()
  const data = trx.select(column).from(table).where(filter)
  return data
}

async function selectAll<T>(table: string): Promise<T[]> {
  const trx = await trxProvider()
  const data = await trx.select('*').from(table)
  return data
}

async function selectAllWhere<T>(
  table: string,
  filter: {
    key: keyof T extends string ? keyof T : never
    value: string | number | boolean
  }
): Promise<T[]> {
  const trx = await trxProvider()
  const data = await trx.select('*').from(table).where(filter.key, filter.value)
  return data
}

export {select, selectAll, selectAllWhere}
