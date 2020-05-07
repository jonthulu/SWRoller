import React, {useState} from 'react';

import DieSetSelector from '../../common/dieSetSelector/DieSetSelector';

import './homePage.scss';

/**
 * The HomePage component.
 */
function HomePage(): React.ReactElement {
  const [backgroundUrl, setBackgroundUrl] = useState('');

  return (
    <div id="home-page" className="h-100">
      <div className="container h-100" style={{backgroundImage: `url(${backgroundUrl})`}}>
        <div className="row h-100">
          <div className="column col-8">
            <DieSetSelector updateBackground={setBackgroundUrl} />
          </div>
          <div className="column col-4">
            Chat
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
