import { useEffect, useState } from "react";
import { Brand, Masthead, MastheadBrand, MastheadMain } from '@patternfly/react-core';

export default function OcmHeader(){
    let [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        window.addEventListener("message", event => {
			if (event.data.images) {
                for (const img of event.data.images) {
                    if (img.name === "ocmLogo") {
                        setImageUrl(img.uri);
                        break; // Exit the loop once the object is found
                    }
                }
			}        
        });
    });

   
    return (
        // <PageHeader className="logo" logo={LogoImg} />
        <Masthead>
        <MastheadMain>
            <MastheadBrand>
            <Brand src={imageUrl} alt="OCM Logo" className="logo"/>
            </MastheadBrand>
        </MastheadMain>

        </Masthead>
    );
    
}
