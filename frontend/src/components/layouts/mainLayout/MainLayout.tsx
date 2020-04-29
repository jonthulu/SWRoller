import React from 'react';
import {Link} from 'react-router-dom';

import {homeRoute} from '../../routePaths';

import './mainLayout.scss';

type Props = {
  page: React.ReactElement;
  pageTitle?: string;
}

/**
 * The MainLayout component.
 *
 * @param props
 * @param props.page - The React Element to display as the page.
 * @param [props.pageTitle] - Title to display above the page.
 */
function MainLayout({page, pageTitle}: Props): React.ReactElement
{
  return (
    <div id="main-layout">
      <div id="main-container" className="container" role="main">
        <div id="main-layout-wrapper-row" className="row">
          <div id="main-layout-wrapper-column" className="column small-12 medium-6 medium-offset-3">
            <div id="main-layout-top-row" className="row">
              <div id="main-layout-top-column" className="column small-12">
                <Link to={homeRoute}>
                  <img className="logo-img" src="" alt="Logo" />
                </Link>

                {(pageTitle) && (
                  <h1 className="main-layout-title">{pageTitle}</h1>
                )}
              </div>
            </div>
            <div id="main-layout-main-row" className="row">
              <div id="main-layout-main-column" className="column small-12">
                {page}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
