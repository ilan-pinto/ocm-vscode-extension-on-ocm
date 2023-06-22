import { useEffect, useState } from "react";
import { PageHeader } from '@patternfly/react-core';

export default function OcmHeader(){
    let [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        window.addEventListener("message", event => {
            
			if ('ocmLogo' in event.data.images) {
                console.log(event.data.images)
                let uri = `${event.data.images.ocmLogo.scheme}://${event.data.images.ocmLogo.authority}${event.data.images.ocmLogo.path} `
				setImageUrl(uri);
			}        
            });
        });

    const LogoImg =  <img src={imageUrl} alt="OCM Logo" />   
    return (
        <PageHeader className="logo" logo={LogoImg} />
    );
    
}
