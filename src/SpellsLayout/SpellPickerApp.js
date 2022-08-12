import { useSearchParams } from 'react-router-dom'

import SpellCards from './DisplaySpells/SpellCards'
import SpellEditor from "./EditSpells/SpellEditor"

const SpellPickerApp = ({spells}) => {
    const [searchParams] = useSearchParams();
    if(searchParams.get('display') === 'true'){
        return (<SpellCards spells={spells} />)
    }else{
        return (<SpellEditor spells={spells} />)
    }
}
export default SpellPickerApp