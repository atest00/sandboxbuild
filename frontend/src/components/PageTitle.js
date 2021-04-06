import React from 'react';
import { Figure } from 'react-bootstrap';
import logo from '../images/Giftzilla.png';

function PageTitle()
{
   return(
      <div className="title">
        <br></br>
        <Figure className="imageAlign">
            <Figure.Image
                width={500}
                height={500}
                alt="<image>"
                src={logo}
            />
        </Figure>
      </div>
   );
};

export default PageTitle;
