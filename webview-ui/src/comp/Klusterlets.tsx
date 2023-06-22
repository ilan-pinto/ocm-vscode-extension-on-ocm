import { useState, useEffect } from 'react';
import { OcmResource } from '../../../src/data/loader'
import { ConditionTableComponent } from '../common/ConditionTable';
import { DateFormat } from '../common/common';

export default function ShowKlusterlets() {
    let [klusterlets, setKlusterlets] = useState<OcmResource[]>([]);

	useEffect(() => {
        window.addEventListener("message", event => {
			if ('crsDistribution' in event.data.msg && 'Klusterlet' === event.data.msg.crsDistribution.kind) {
				setKlusterlets(JSON.parse(event.data.msg.crsDistribution.crs));
			}
        });
    });

    const row = klusterlets.map(klusterlet => {            
        return klusterlet.kr.status.conditions.map( (condition:any) => { 
            return [new Date(condition.lastTransitionTime).toLocaleString("en-US",DateFormat),
                    condition.message,
                    condition.reason,
                    condition.status
                ]      
            })
        })
    return (
      
        <section className="component-row">
            { klusterlets.length > 0 &&
                <>
                        {klusterlets.map(klusterlet => {
                            return  <>               
                                    <ConditionTableComponent title={`${klusterlet.kr.metadata.name}` } rows={ row[0]}  /> 
                                    </>
                        } )
                        }
                    <div style={{ borderTop: "1px solid #fff ", marginLeft: 10, marginRight: 10 }}></div>
                </>
            }
        </section>

    );
}
