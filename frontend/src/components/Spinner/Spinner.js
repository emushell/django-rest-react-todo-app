import React from 'react';

import classes from './Spinner.module.css';

// const spinner = (props) => {
//     return (
//         <div className={`fa-3x ${classes['loader-position']}`}>
//             <i className="fas fa-spinner fa-pulse" />
//         </div>
//     );
// };

const spinner = (props) => {
    return (
        <div className={classes['loader']}>Loading...</div>
    );
};

export default spinner;