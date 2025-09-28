"use client"

import * as React from 'react'
// import '@/components/editor/style/index.css'
import '@/components/editor/style/index.css'
import type { Content, Editor } from '@tiptap/react'
import type { UseMinimalTiptapEditorProps } from './hook/use-minimal-tiptap' 
import { EditorContent } from '@tiptap/react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { SectionOne } from '@/components/editor/section/one'
import { SectionTwo } from '@/components/editor/section/two'
import { useMinimalTiptapEditor } from '@/components/editor/hook/use-minimal-tiptap'
import { MeasuredContainer } from '../editor/measured-container'
import SectionThree from './section/three'
import SectionFour from './section/four'
import SectionFive from './section/five'

export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content
  onChange?: (value: Content) => void
  className?: string
  editorContentClassName?: string
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border mx-2 my-2 rounded-lg border-border p-2">
    <div className="flex w-max items-center gap-2">
      <SectionOne editor={editor} activeLevels={[1, 2, 3]} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTwo
        editor={editor}
        activeActions={['italic', 'bold', 'underline', 'code', 'strikethrough', 'clearFormatting']}
        mainActionCount={5}
        variant="outline"
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} variant="outline" />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour
        editor={editor}
        activeActions={['bulletList', 'orderedList']}
        mainActionCount={2}
        variant="outline"
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive
        editor={editor}
        activeActions={['blockquote', 'codeBlock', 'horizontalRule']}
        mainActionCount={3}
        variant="outline"
      />
    </div>
  </div>
)

export const MinimalTiptapEditor = React.forwardRef<HTMLDivElement, MinimalTiptapProps>(
  ({ value, onChange, className, editorContentClassName, ...props }, ref) => {
    const editor = useMinimalTiptapEditor({
      value,
      onUpdate: onChange,
      ...props
    })

    if (!editor) {
      return null
    }

    return (
      <MeasuredContainer
        as="div"
        name="editor"
        ref={ref}
        className={cn(
          'flex h-[592] min-h-80 w-full flex-col rounded-3xl border border-input pb-6',
          editor?.isEditable && "border-b-4",
          className
        )}
      >
        {editor?.isEditable && <Toolbar editor={editor} />}
        <EditorContent editor={editor} className={cn('minimal-tiptap-editor dark:text-white  text-black', editorContentClassName)} />
      </MeasuredContainer>
    )
  }
)

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor'

export default MinimalTiptapEditor
