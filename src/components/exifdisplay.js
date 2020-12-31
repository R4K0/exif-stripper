import { Pagination, Table } from "react-bootstrap";

const { useState } = require("react")

function DisplayExif(props) {
    // Because the exif properties are returned as objects AND we want to extract the keys out of it and display it, we need to extract them then index the object with them
    var splitTags = Object.keys(props.exif.tags);
    var pages = Math.ceil(splitTags.length / 10);

    // array to hold our paginator buttons
    var paginationItems = []
    const [activePage, setPage] = useState(1)

    for (let index = 1; index < pages + 1; index++) {
        paginationItems.push(
            <Pagination.Item active={index == activePage} onClick={() => { setPage(index) }}>
                {index}
            </Pagination.Item>
        )
    }

    // pagination borrowed from: https://shouts.dev/easiest-way-to-paginate-an-array-in-javascript
    function paginator(items, current_page, per_page_items) {
        let page = current_page || 1,
            per_page = per_page_items || 10,
            offset = (page - 1) * per_page,

            paginatedItems = items.slice(offset).slice(0, per_page_items),
            total_pages = Math.ceil(items.length / per_page);

        return {
            page: page,
            per_page: per_page,
            pre_page: page - 1 ? page - 1 : null,
            next_page: (total_pages > page) ? page + 1 : null,
            total: items.length,
            total_pages: total_pages,
            data: paginatedItems
        };
    }

    // Make sure we can't change page to less than 1, or more than max pages
    function changePage(diff) {
        setPage(Math.min(Math.max(1, activePage + diff), pages));
    }

    return (
        <div>
            {
                // If there are no pages to show, then don't bother even drawing the pagination element
                pages > 0 ?
                    <Pagination >
                        <Pagination.Prev onClick={ () => { changePage(-1) } } />
                        {paginationItems}
                        <Pagination.Next onClick={ () => { changePage(1) } } />
                    </Pagination> : undefined
            }

            <Table striped bordered responsive size="sm">
                <thead>
                    <tr>
                        <th>Data Header</th>
                        <th>Data Value</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        splitTags.length > 0 ? paginator(splitTags, activePage, 10).data.map(key => {
                            return (
                                <tr key={`exif-${key}`}>
                                    <td>{key}</td>
                                    <td>{props.exif.tags[key]}</td>
                                </tr>
                            )
                        }) : <tr><td colSpan="2" className="text-center">No EXIF data to display!</td></tr>
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default DisplayExif;