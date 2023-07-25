import { OcmResource } from '../../../src/data/loader'
import { ConditionTableComponent } from '../common/ConditionTable';
import { DateFormat } from '../common/common';
import { OcmLabels } from '../common/Labels';

type klusterletProps = {
    klusterlet: OcmResource[]
}

export default function ShowKlusterlet(Props: klusterletProps) {



    const row = Props.klusterlet.map(klusterlet => {            
        return klusterlet.kr.status.conditions.map( (condition:any) => { 
            return [new Date(condition.lastTransitionTime).toLocaleString("en-US",DateFormat),
                    condition.message,
                    condition.reason,
                    condition.status
                ]      
            })
        })
    return (
        //TODO-Add panel 
        //TODO-add Klusterlet dashboard 
        <section className="component-row">
            { Props.klusterlet.length > 0 &&
                <>
                        {Props.klusterlet.map(klusterlet => {
                            return  <>               
                                    <ConditionTableComponent id='' title={`${klusterlet.kr.metadata.name}` } rows={ row[0]}  /> 
                                    {klusterlet.kr.metadata.labels?<OcmLabels labels={klusterlet.kr.metadata.labels} />:null }
                                    </>
                        } )
                        }
                    <div style={{ borderTop: "1px solid #fff ", marginLeft: 10, marginRight: 10 }}></div>
                </>
            }
        </section>

    );
}
