import React from 'react';



const Story = ({ first_name, last_name, email, gender }) => (
  <div>
    {first_name} - {email}
  </div>
);

export default Story;