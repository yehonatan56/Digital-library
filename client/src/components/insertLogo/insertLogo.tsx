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
    return (
        <div>
            <h1>Insert Logo</h1>
            <input
                className="form-control"
                type="file"
                id="formFile"
                ref={logo}
                onChange={(e) => setFileState(e.currentTarget.files ? e.currentTarget.files[0] : null)}
            />

            {preview && <img src={preview} alt="preview" style={{ width: '300px', height: '300px' }} />}
        </div>
    );
});
export default InsertLogo;
