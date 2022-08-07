import { buildSchema, execute, parse } from 'graphql'
import { addMocksToSchema } from '@graphql-tools/mock'
import schema from './schema.graphql'
import validQuery from './validQuery.graphql'

const schemaAst = buildSchema(schema)
const document = parse(validQuery)

const schemaWithMocks = addMocksToSchema({
  schema: schemaAst,
  mocks: {},
})

export const executeQuery = async () => {
  const result = await execute({
    schema: schemaWithMocks,
    document,
  })
  return result
}
