import { InputComponentProps } from '@/app/(home)/billing_and_coding/data';
import React, { useState } from 'react';
import ArrowDownIcon from '../ArrowDownIcon';
import Image from 'next/image';

const InputComponent = ({ inputComponentProps }: {inputComponentProps: InputComponentProps}) => {
    switch (inputComponentProps.inputTag) {
      case 'text':
      case 'tel':
      case 'date':
        return (
          <div className="input-group w-full">
            <label className={inputComponentProps.labelClass}>{inputComponentProps.label}</label>
            <input
              type={inputComponentProps.inputType}
              name={inputComponentProps.name}
              defaultValue={inputComponentProps.value}
              onChange={inputComponentProps.onChange}
              placeholder={inputComponentProps.placeholder}
              className={inputComponentProps.inputClass}
            />
            {inputComponentProps.errorMessage && <span className={inputComponentProps.errorClass}>{inputComponentProps.errorMessage}</span>}
          </div>
        );
      case 'select':
        return (
            <div className="input-group">
                <label className={inputComponentProps.labelClass}>{inputComponentProps.label}</label>
                <div className='relative inline-block gap-8 rounded-lg w-full'>
                    <select
                        name={inputComponentProps.name}
                        defaultValue={inputComponentProps.value}
                        onChange={inputComponentProps.onChange}
                        className={inputComponentProps.inputClass}
                    >
                        {inputComponentProps.options && inputComponentProps?.options.map((option, i) => (
                            <option key={i} value={option}>{option}</option>
                        ))}
                    </select>
                    <ArrowDownIcon />
                </div>
                {inputComponentProps.errorMessage && <span className={inputComponentProps.errorClass}>
                  <Image src="/information-circle-1.svg" width={24} height={24} alt='public\information-circle-1.svg'/>
                  {inputComponentProps.errorMessage}
                </span>}
            </div>
        );
      case 'radio':
        return (
          <div className="input-group radio-group flex items-center">
            {inputComponentProps.label && <label htmlFor={inputComponentProps.name} className={inputComponentProps.labelClass}>{inputComponentProps.label}</label>}
            {inputComponentProps.radioOptions && inputComponentProps.radioOptions.map((option, i) => (
                <div className='flex items-center' key={i}>
                    <input
                        id={inputComponentProps.name}
                        type="radio"
                        name={inputComponentProps.name}
                        defaultValue={inputComponentProps.value}
                        onChange={inputComponentProps.onChange}
                        className={inputComponentProps.inputClass}
                    />
                    <label className="radio-label">
                        {option}
                    </label>
                </div>
            ))}
            {inputComponentProps.errorMessage && <span className={inputComponentProps.errorClass}>{inputComponentProps.errorMessage}</span>}
          </div>
        );
      case 'textarea':
        return (
          <div className="input-group">
            <label className={inputComponentProps.labelClass}>{inputComponentProps.label}</label>
            <textarea
              name={inputComponentProps.name}
              defaultValue={inputComponentProps.value}
              onChange={inputComponentProps.onChange}
              
              className={inputComponentProps.inputClass}
              placeholder={inputComponentProps.placeholder}
            />
            {inputComponentProps.errorMessage && <span className={inputComponentProps.errorClass}>{inputComponentProps.errorMessage}</span>}
          </div>
        );
      default:
        return null;
    }
};


export default InputComponent;