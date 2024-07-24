import { getFooterCopy, getFullYear, getLatestNotification } from './utils';

describe('Get the full year', function () {
  it('The Correct Year', function () {
    expect(getFullYear()).toBe(new Date().getFullYear());
  });
});

describe('Get the footer copy', function () {
  it('The truthy footer', function () {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });
  it('The falsey footer', function () {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });
});

describe('Get the latest notification', function () {
  it('The urgent message', function () {
    expect(getLatestNotification()).toBe(
      '<strong>Urgent requirement</strong> - complete by EOD'
    );
  });
});
