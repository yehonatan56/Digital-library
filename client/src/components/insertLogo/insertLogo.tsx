import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useFilePreview } from '../../hooks/useFilePreview.tsx';

const InsertLogo = forwardRef(function (_props, ref) {
    const [fileState, setFileState] = useState<File | null>(null);
    const logo = useRef<File | null>(null);
    const preview = useFilePreview(fileState);

    useImperativeHandle(ref, () => ({
        triggerSubmit: () => {
            return handleSubmit(new Event('submit') as any); // simulate submit event
        },
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fileState) {
            // todo: check how to create a custom error popup
            console.error('No file selected');
            return false;
        }
        return fileState;
    };
    return (
        <div>
            <h1>Insert Logo</h1>

            <input
                className="form-control"
                type="file"
                id="formFile"
                /* @ts-expect-error: The ref type does not match the expected type for this input element */
                ref={logo}
                onChange={(e) => setFileState(e.currentTarget.files ? e.currentTarget.files[0] : null)}
            />

            {preview && <img src={preview} alt="preview" style={{ width: '300px', height: '300px' }} />}
        </div>
    );
});
export default InsertLogo;
