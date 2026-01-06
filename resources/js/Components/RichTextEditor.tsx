import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    id?: string;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, id, placeholder }: RichTextEditorProps) {
    const editorRef = useRef<any>(null);

    return (
        <div className="mt-1 rich-text-editor">
            <Editor
                id={id}
                onInit={(evt, editor) => editorRef.current = editor}
                value={value}
                onEditorChange={(content) => onChange(content)}
                licenseKey="gpl"
                init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }',
                    placeholder: placeholder || 'Start writing...',
                    skin: 'oxide',
                    branding: false,
                }}
            />
        </div>
    );
}
