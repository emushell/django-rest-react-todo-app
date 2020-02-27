import React, { useState } from 'react';

export const Input = (props) => {
    const {
        elementConfig,
        className,
        value,
        onChange,
        name,
        fileInputLabel
    } = props;

    const [inputValue, setInputValue] = useState(
        { value: elementConfig.type !== 'file' ? value : fileInputLabel.value });

    const handleChange = (event) => {
        let { value } = event.target;
        if (elementConfig.type === 'file') {
            value = value.split(/(\\|\/)/g).pop();
        }
        setInputValue({ value: value });
        onChange(event, value);
    };

    let input = null;
    switch (elementConfig.type) {
        case ('file'):
            input = (
                <div className="custom-file">
                    <input {...elementConfig}
                           name={name}
                           className={className}
                           onChange={handleChange}
                           id="file-input" />
                    <label className={fileInputLabel.className} htmlFor="file-input">{inputValue.value}</label>
                </div>
            );
            break;
        default:
            input = (
                <input {...elementConfig}
                       className={className}
                       value={inputValue.value || ''}
                       onChange={handleChange}
                       name={name}
                />
            );
    }

    return (
        <>
            {input}
        </>
    );
};
