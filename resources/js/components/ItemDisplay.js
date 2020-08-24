import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './TodoItem';
import {AppContext} from "../contexts/AppContext";
import {LOGGED_IN} from "../constants/AuthStatus";
import apiClient from "../apiClient";

const ItemDisplay = () => {
    const appContext = useContext(AppContext);
    const {
        authStatus,
        selectedList
    } = appContext;

    const [listItems, setListItems] = React.useState([]);

    React.useEffect(() => {

        if (authStatus === LOGGED_IN) {
            apiClient.get('/api/items/' + selectedList.id)
                .then(response => {
                    setListItems(response.data)
                })
                .catch(error => console.error(error));
        }
    }, [authStatus, selectedList]);

    return (
        <div className="item-display">
            <span>{selectedList.name}</span>
            <pre>{JSON.stringify(listItems, null, 2)}</pre>
            {listItems.map((value, index) => {
                return <TodoItem key={value.id}
                                 name={value.name}
                                 detail={value.detail}
                                 createdAt={value.created_at}
                                 updatedAt={value.updated_at}></TodoItem>
            })}
        </div>
    );
}

export default ItemDisplay;
