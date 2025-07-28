import React, { Fragment, useEffect, useRef, memo } from 'react';
import _ from 'lodash';
import Choices from 'choices.js';
import '../assets/custom/css/choices.css';

const ChoicesJs = memo((props) => {
    const selectRef = useRef();
    const choicesInstance = useRef(null);
    const isMultiple = props.select === 'multi';
    const allowAddItems = props.addItems === true;

    useEffect(() => {
        if (!selectRef.current) return;

        choicesInstance.current = new Choices(selectRef.current, {
            removeItemButton: isMultiple,
            allowHTML: true,
            shouldSort: false,
            addItems: allowAddItems,
            duplicateItemsAllowed: false,
            paste: false,
        });

        if (defaultValue) {
            if (isMultiple && Array.isArray(defaultValue)) {
                defaultValue.forEach(val => {
                    choicesInstance.current.setChoiceByValue(val);
                });
            } else {
                choicesInstance.current.setChoiceByValue(defaultValue);
            }
        }

        const handleChange = (e) => {
            const selected = isMultiple
                ? Array.from(e.target.selectedOptions).map(opt => opt.value)
                : e.target.value;
            if (typeof onChange === 'function') {
                onChange(selected);
            }
        };

        selectRef.current.addEventListener('change', handleChange);

        return () => {
            if (choicesInstance.current) {
                choicesInstance.current.destroy();
                choicesInstance.current = null;
            }
            if (selectRef.current) {
                selectRef.current.removeEventListener('change', handleChange);
            }
        };
    }, []); 
      

    return (
        <Fragment>
            <select
                ref={selectRef}
                className={props.className}
                multiple={isMultiple}
                onChange={(e) => {
                    const selected = isMultiple
                        ? Array.from(e.target.selectedOptions).map(opt => opt.value)
                        : e.target.value;
                    if (_.isFunction(props.onChange)) {
                        props.onChange(selected);
                    }
                }}
            >
                {!isMultiple && <option value="">Seçiniz</option>}
                {props.options.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
        </Fragment>
    );
});

ChoicesJs.displayName = 'ChoicesJs';
export default ChoicesJs;
