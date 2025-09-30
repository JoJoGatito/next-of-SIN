import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import type {DocumentActionDescription, DocumentActionProps} from 'sanity'

// Factory that creates a "Duplicate" document action using the Studio client
function duplicateActionFactory(client: any) {
  return function DuplicateAction(props: DocumentActionProps): DocumentActionDescription {
    const source = props.draft || props.published

    return {
      label: 'Duplicate',
      title: 'Create a copy of this document',
      shortcut: 'mod+d',
      disabled: !source,
      onHandle: async () => {
        try {
          if (!source) {
            props.onComplete?.()
            return
          }

          // Omit system fields and potentially conflicting fields
          const {_id, _rev, _createdAt, _updatedAt, ...rest} = source as Record<string, any>

          // Avoid slug collisions if present
          if (rest.slug) {
            delete rest.slug
          }

          // Optionally clarify the copy in the title if available
          if (typeof rest.title === 'string' && rest.title.length > 0) {
            rest.title = `${rest.title} (copy)`
          }

          // Ensure the new document has the correct type
          const newDoc = {
            ...rest,
            _type: props.type,
          }

          // Create a new published document (no _id means Sanity will assign one)
          await client.create(newDoc)

          // Close the action dialog
          props.onComplete?.()
        } catch (err) {
          // Best-effort completion even if something goes wrong to avoid a stuck UI
          // You can replace with a toast if you later add a toast system
          // eslint-disable-next-line no-console
          console.error('Duplicate action failed', err)
          props.onComplete?.()
        }
      },
    }
  }
}

export default defineConfig({
  name: 'default',
  title: 'SIN',

  projectId: '9gy6eznb',
  dataset: 'production',

  deployment: {
    autoUpdates: true,
  },

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // Enable a Duplicate action for all document types (covers events, local events, resources, etc.)
  document: {
    actions: (prev, context) => {
      const duplicate = duplicateActionFactory(context.getClient({apiVersion: '2024-01-01'}))
      return [...prev, duplicate]
    },
  },
})
