import React, { Component } from 'react';

class Sort extends Component {

 

  onClick = (sortBy, sortValue) => {
   this.props.onSort(sortBy,sortValue)
  }

  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Sắp Xếp
            </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={() => this.onClick('name', 1)}>
              <a role="button" className="sort_selected">
                Tên A-Z
                </a>
            </li>
            <li>
              <a role="button" className="sort_selected" onClick={() => this.onClick('name', -1)}>
                Tên Z-A
                </a>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}

export default Sort;
