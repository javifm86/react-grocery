import React, { FunctionComponent } from 'react';
import classes from './Loading.module.css';

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <div
      className={`${classes.loading} d-block h-12 w-12 border-gray-900 border-opacity-25 border-4 rounded-full animate-spin`}
    ></div>
  );
};

export default Loading;
