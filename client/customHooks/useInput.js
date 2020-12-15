import { useState } from 'react';

export function useInput (initialValue){
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }
   return [ value, handleChange ];
}

export function useInputClear (initialValue){
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    e.target ?
      setValue(e.target.value) :
      setValue(e)
  }

   return [ value, handleChange ];
}
