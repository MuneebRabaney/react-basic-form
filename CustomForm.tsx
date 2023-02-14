import * as React from 'react';
import { styled } from 'styled-components';

const styles = {
  form: {
    width: '100vw',
    background: "url('http://www.kalamullah.com/images/bg-tile.png') top left",
  },
  fieldset: {
    border: 'none',
    padding: '20px',
    display: 'block',
    margin: '0 auto',
  },
  input: { display: 'block', margin: '10px 0' },
};

function CustomForm(): JSX.Element {
  return (
    <form style={styles.form}>
      <fieldset style={styles.fieldset}>
        <label htmlFor="fullname">Name</label>
        <input id="fullname" type="text" style={styles.input} />
      </fieldset>
      <button>Click Me</button>
    </form>
  );
}

export default CustomForm;
