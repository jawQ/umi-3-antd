import React from 'react';

const BaseLayout = (props) => (
  <div data-title="i am layout" style={{ padding: 24, minHeight: 360 }}>
    {props.children}
  </div>
);
export default BaseLayout;
