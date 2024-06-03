import { type SchemaTypeDefinition } from 'sanity'
import blockContent from './schemas/objects/blockContent'
import globals from './schemas/documents/globals'
import project from './schemas/documents/project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [globals, project, blockContent],
}
