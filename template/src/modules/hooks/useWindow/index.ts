import { useState, useEffect } from 'react';
import { breakpoints } from './constants';
import { Breakpoint, BreakpointType, Window } from './types';

function getBreakpointMap(size: number) {
  let breakpoint = {} as Breakpoint;

  Object.keys(breakpoints).map((key) => {
    const type = key as BreakpointType;

    if (breakpoints[type] > size) {
      breakpoint = { ...breakpoint, [type]: true };
    } else {
      breakpoint = { ...breakpoint, [type]: false };
    }
    return type;
  });

  return breakpoint;
}

function useWindow(): Window {
  const [data, setData] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= breakpoints.md,
    breakpoint: getBreakpointMap(window.innerWidth),
  });

  function onResize() {
    setData({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= breakpoints.md,
      breakpoint: getBreakpointMap(window.innerWidth),
    });
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  });

  return data;
}

export default useWindow;
