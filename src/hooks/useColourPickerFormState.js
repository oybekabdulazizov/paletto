import { useState, useEffect } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

export default function useColourPickerFormState(props) {
  const { addColour, colours, randomColour } = props;
  const [newColourName, setNewColourName] = useState('');
  const [newColour, setNewColour] = useState(randomColour);

  useEffect(() => {
    ValidatorForm.addValidationRule('isColourNameUnique', (value) =>
      colours.every((c) => c.name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule('isColourUnique', (value) =>
      colours.every((c) => c.colour !== newColour)
    );
  }, [colours, newColour]);

  const handleNewColourNameChange = (e) => {
    e.preventDefault();
    setNewColourName(e.target.value);
  };

  const handleAddColour = () => {
    addColour(newColour, newColourName);
    setNewColourName('');
  };

  const handleChangeComplete = (newCol) => setNewColour(newCol.hex);

  return {
    handleAddColour,
    handleChangeComplete,
    handleNewColourNameChange,
    newColour,
    newColourName,
  };
}
