import { breakpoints } from './constants';

export type Breakpoint = Record<keyof typeof breakpoints, boolean>;
export type BreakpointType = keyof typeof breakpoints;

export interface Window {
  width: number;
  height: number;
  isMobile: boolean;
  breakpoint: Breakpoint;
}
