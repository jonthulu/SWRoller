import React from 'react';

/**
 * The NotFoundPage component.
 */
function NotFoundPage(): React.ReactElement {
  return (
    <div id="not-found-page" className="system-page">
      <div className="container-fluid">
        <div className="row main-row row-odd">
          <div className="col">
            <h1 className="nei-h">404 Not Found</h1>
            <hr />
            <div className="not-found-text">
              This page was not found.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
