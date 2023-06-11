import React from "react";
import {
	Nav,
	NavList,
	NavItem,
	NavExpandable,
	Page,
	PageHeader,
	PageSidebar,
	SkipToContent
  } from '@patternfly/react-core';
import { css } from "@patternfly/react-styles";
  

export default function OcmHeader(){

    const LogoImg =  <img src="./webview-ui/public/ocm.svg" alt="OCM Logo" />   
    return (
        <PageHeader
        logo={LogoImg}
        showNavToggle
       
        />
    );
    
}
