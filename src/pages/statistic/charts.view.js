import React, { useEffect, useState } from 'react';
import './charts.less';

function Charts(props) {
    const [data, setData] = useState([]);
    const [maxCount, setMaxCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(0);
    const [devicesCount, setDevicesCount] = useState(null);

    useEffect(() => {
        const dataTemp = [];
        let currentMaxCount = 0;
        const categoriesArray = [];
        props.devices.map(item => {
            if (item.count > currentMaxCount) currentMaxCount = item.count;
            if (!categoriesArray.find(categoryItem => categoryItem.id === item.category_id)) {
                categoriesArray.push({
                    id: item.category_id,
                    title: item.category,
                });
            }
            dataTemp.push(
                {
                    ...item,
                    key: item.id
                }
            );

        });
        setMaxCount(currentMaxCount);
        setCategories(categoriesArray);
        setData(dataTemp);
    }, [props.devices]);

    useEffect(() => {
        if (activeCategory) {
            let count = 0;
            const filteredItems = props.devices.filter(device => device.category_id === activeCategory);

            filteredItems.forEach(item => count += item.count);

            setData(Array.from(filteredItems));
            setDevicesCount(count);
        } else {
            setData(props.devices);
            setDevicesCount(null);
        }

    }, [activeCategory]);

    useEffect(() => {
        setActiveCategory(0);
    }, [props.devices]);

    const getLineWidth = (count) => {
        return `${count / maxCount * 100}%`;
    };

    return(
        <>
            <ul className="charts-categories">
                <li
                    className={activeCategory === 0 ? 'active' : ''}
                    onClick={() => {
                        setActiveCategory(0);
                    }}
                >
                    Все устройства
                </li>
                {
                    categories.map(category =>
                        <li
                            className={activeCategory === category.id ? 'active' : ''}
                            onClick={() => {
                                setActiveCategory(category.id);
                            }}
                        >
                            {category.title}
                        </li>
                    )
                }
            </ul>
            {
                props?.devices_count &&
                <p
                    style={{
                        margin: '30px 0'
                    }}
                >
                    За данный период добавлено устройств -
                    <span
                        style={{
                            border: '2px solid #4286F4',
                            borderRadius: '10px',
                            padding: '6px 12px',
                            marginLeft: '10px',
                        }}
                    >
                        {devicesCount || props.devices_count}
                    </span>
                </p>
            }
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '40px'
                }}
            >
                <div
                    style={{
                        width: '100%',
                        position: 'relative'
                    }}
                >
                    <div className="charts-grid-numbers">
                        <span>{parseInt(maxCount / 5) }</span>
                        <span>{parseInt(maxCount / 5) * 2}</span>
                        <span>{parseInt(maxCount / 5) * 3}</span>
                        <span>{parseInt(maxCount / 5) * 4}</span>
                        <span>{maxCount}</span>
                    </div>
                    <ul className="devices-charts">
                        {data.map(item =>
                            <li
                                onClick={() => {
                                    props.handleBarClick(item)
                                }}
                            >
                                <span
                                    style={{
                                        background: item.background,
                                        width: getLineWidth(item.count),
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {`(${item.count}) ${item.t_product_id}`}
                                </span>
                            </li>
                        )}
                    </ul>
                    <div className="charts-grid">
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                    </div>
                    <div className="charts-grid-numbers">
                        <span>{parseInt(maxCount / 5) }</span>
                        <span>{parseInt(maxCount / 5) * 2}</span>
                        <span>{parseInt(maxCount / 5) * 3}</span>
                        <span>{parseInt(maxCount / 5) * 4}</span>
                        <span>{maxCount}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Charts;
