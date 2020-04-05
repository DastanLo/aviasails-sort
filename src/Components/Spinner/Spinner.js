import React, {Fragment} from 'react';

import './Spinner.css';
import Backdrop from "../Backdrop/Backdrop";

const Spinner = (props) => {
  return (
      <Fragment>
        <Backdrop show={props.show}/>
        <div className="Spinner">Loading...</div>
      </Fragment>

  );
};

export default Spinner;
