import ConsFilter from './ConsFilter';
import SearchCons from './SearchCons';
import ConsList from './ConsList';

export default function ListContainer() {

    return (
        <div id = "list-container">
            <SearchCons/>
            <ConsList/>
            <ConsFilter/>
        </div>
    )
}