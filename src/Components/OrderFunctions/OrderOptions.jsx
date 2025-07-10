import { useEffect } from "react"

export const OrderForm = () => {

const [allSize, setAllSize] = useState([]) ///renders page each time
useEffect(() => {

},[])



return(
<div container="size-options">
<div>Size:</div>
<select>
    <options>
        
    </options>
</select>
</div>
)
}