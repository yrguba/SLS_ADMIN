import React, {useEffect, useState} from "react";
import './table.less';

function Table(props) {
    let currentKey = null;
    const [dataSource, setDataSource] = useState([]);
    const [currentKeySt, setCurrentKeySt] = useState(null);
    const [sortDirection, setSortDirection] = useState(false);

    useEffect(() => {
        setDataSource(props.dataSource);
    }, [props.dataSource]);

    const sortFunc = (a, b) => {
        return !sortDirection ? b[currentKey] - a[currentKey] : a[currentKey] - b[currentKey];
    };

    const handleSortByColumn = (column) => {
        const initialData = Array.from(props.dataSource);
        const sortedData = initialData.sort(sortFunc);
        setDataSource(Array.from(sortedData));
    };

    const getSortDirectionClass = (column) => {
        return `table-filter-icon ${currentKeySt === column.key && sortDirection ? 'up' : ''}`
    };

    return(
        <>
            {dataSource && dataSource?.length > 0 &&
                <ul className={`${props.className || ''} table`}>
                    {
                        <>
                            <li className="table-head">
                                <ul>
                                    {props?.columns.map(column =>
                                        <li
                                            className="table-column"
                                            key={column.key}
                                            style={{
                                                width: `${column.width}%`,
                                            }}
                                        >
                                            <span>{column.title}</span>
                                            {
                                                column.sorted &&
                                                <svg
                                                    onClick={() => {
                                                        currentKey = column.key;
                                                        setCurrentKeySt(column.key);
                                                        setSortDirection(!sortDirection);
                                                        handleSortByColumn(column);
                                                    }}
                                                    className={getSortDirectionClass(column)}
                                                    width="8"
                                                    height="6"
                                                    viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.706145 2.4141L3.29615 5.0041C3.68615 5.3941 4.31615 5.3941 4.70615 5.0041L7.29614 2.4141C7.92615 1.7841 7.47614 0.704102 6.58614 0.704102H1.40615C0.516145 0.704102 0.0761452 1.7841 0.706145 2.4141Z" fill="#9BA3B1"/>
                                                </svg>
                                            }
                                        </li>
                                    )}
                                </ul>
                            </li>
                            {dataSource.map((item, index) => {
                                return(
                                    <li
                                        className="table-row"
                                        onClick={
                                            () => {
                                                if (props.rowSelection) {
                                                    props.rowSelection(item);
                                                }

                                            }}
                                    >
                                        <ul>
                                            {props.columns.map(column =>
                                                <li
                                                    className="users-table-column"
                                                    key={column.key}
                                                    style={{
                                                        width: `${column.width}%`,
                                                        fontSize: `${column.size || 14}px`,
                                                        color: `${column.color || '#000'}`
                                                    }}
                                                >
                                                    {column.render &&
                                                        column.render(item, item[index])
                                                    }
                                                    {!column.render &&
                                                        item[column.dataIndex]
                                                    }
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                                )}
                            )}
                        </>
                    }
                </ul>
            }

            {props?.dataSource && props?.dataSource?.length === 0 &&
                <p
                    className="table-empty-text"
                >
                    {props.emptyText || ''}
                </p>
            }
        </>
    );
}

export default Table;
