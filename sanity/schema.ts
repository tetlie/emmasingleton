import { type SchemaTypeDefinition } from 'sanity'
import blockContent from './schemas/objects/blockContent'
import globals from './schemas/documents/globals'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [globals, blockContent],
}
