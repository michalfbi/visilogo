import { useRef } from 'react';

/*
 * Spam guard without a visible captcha: a hidden field real visitors never fill,
 * plus a minimum time between page load and submit. Bots trip one or the other.
 */
export const HONEYPOT_NAME = 'company_site';
const MIN_MS = 2500;

export const useSpamGuard = () => {
  const openedAt = useRef(Date.now());
  const isBot = (form) => {
    const trap = form?.elements?.[HONEYPOT_NAME];
    return Boolean(trap && trap.value) || Date.now() - openedAt.current < MIN_MS;
  };
  return { isBot };
};
