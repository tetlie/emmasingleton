const defaultListingsToBeRemoved = ['globals', 'media.tag']

const deskStructure = (S: any, context: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Globals')
        .icon(() => '⛓️')
        .child(S.document().schemaType('globals').documentId('globals')),
      // S.divider(),
      // List out the rest of the document types
      ...S.documentTypeListItems().filter(
        (listItem: any) => ![...defaultListingsToBeRemoved].includes(listItem.getId())
      ),
    ])

export default deskStructure
