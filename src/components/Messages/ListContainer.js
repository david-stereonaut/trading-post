import ConsFilter from './ConsFilter';
import SearchCons from './SearchCons';
import ConsList from './ConsList';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    list: {
        width: 380,
        overflow: 'auto'
    },
}))

export default function ListContainer() {

    const classes = useStyles()

    return (
        <div className={classes.list} id = "list-container">
            <SearchCons/>
            <ConsFilter/>
            <ConsList/>
        </div>
    )
}