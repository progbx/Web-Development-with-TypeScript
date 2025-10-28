import { createElement } from 'react';

function Title() {
  return createElement(
    'h1',
    { style: { color: '#999', fontSize: '19px' } },
    'Solar system planets'
  );
}

export default Title;
