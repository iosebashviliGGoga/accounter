'use client';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <Next13ProgressBar color="var(--main-orange)" options={{ showSpinner: true }} />
    </>
  );
};

export default Providers;