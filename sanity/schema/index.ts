import { type SchemaTypeDefinition } from 'sanity'

import homePage from './homePage'
import aboutPage from './aboutPage'
import contactPage from './contactPage'
import footer from './footer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, aboutPage, contactPage, footer],
}
