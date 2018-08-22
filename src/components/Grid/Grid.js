import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import get from 'lodash/get';

import Octicon, {
  Trashcan,
  Pencil,
  TriangleUp,
  TriangleDown
} from '@githubprimer/octicons-react'

import s from './Grid.module.css';

class Grid extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      columnOrder: Object.keys(props.headers).map(key => {
        return key;
      }),
      sorts: Object.keys(props.headers).reduce((acc, key) => {
        acc[key] = true; // default ascending order
        return acc;
      }, {}),
    };

    this.headers = {};
    this.cells = {};
    this.head = null;
    this.body = null;
    this.offset = null;
    this.currentResizeKey = null;
  }

  componentDidMount() {
    this.registerColumnResizeListener();

    document.addEventListener('mouseup', () => {
      this.currentResizeKey = null;
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.length !== prevProps.data.length) {
      this.alignColumns();
      this.registerColumnResizeListener();
    }
  }

  alignColumns() {
    this.state.columnOrder.forEach(key => {
      const header = this.headers[key];
      this.cells[key].forEach((cell, index) => {
        if (cell) {
          cell.style.width = header.style.width;
          cell.style.maxWidth = header.style.width;
          cell.style.flex = header.style.width;
        } else {
          this.cells[key].splice(index, 1);
        }
      })
    })
  }

  drag(e, source) {
    e.dataTransfer.setData("text/plain", source);
  }
  
  dragOver(e) {
    e.preventDefault()
  }

  drop(e, target) {
    const source = e.dataTransfer.getData("text/plain");
    this.reorderColumns(source, target);
  }
  
  onHeaderClick(column) {
    const order = !this.state.sorts[column];
    this.setState({
      sorts: { ...this.state.sorts, [column]: order },
    });
  
    this.props.onSort(column, order);
  }
  
  reorderColumns(source, target) {
    const columnOrder = this.state.columnOrder;
    const temp = columnOrder[source];
    columnOrder[source] = columnOrder[target];
    columnOrder[target] = temp;
    
    this.setState({
      columnOrder
    }, () => { this.alignColumns() });
  }

  registerColumnResizeListener() {
    document.addEventListener('mousemove', e => {
      if (this.headers[this.currentResizeKey]) {
        const header = this.headers[this.currentResizeKey];
        const width = this.offset + e.pageX;
        
        // Limit column resize width
        if (width <= this.props.maxColumnWidth) {
          header.style.width = width + 'px';
          header.style.maxWidth = width + 'px';
          header.style.flex = `${width} 0 auto` ;
  
          this.cells[this.currentResizeKey].forEach(cell => {
            cell.style.width = width + 'px';
            cell.style.maxWidth = width + 'px';
            cell.style.flex = `${width} 0 auto`;
          });
  
          const totalWidth = Object.keys(this.headers).reduce((acc, key) => {
            return acc + this.headers[key].offsetWidth;
          }, 75); // Width of the actions column
  
          this.head.style.minWidth = totalWidth + 'px';
          this.body.style.minWidth = totalWidth + 'px';
        }
      }
    });
  }

  renderHead() {
    const cells = this.state.columnOrder.map((column, key) => {
      return (
        <div
          ref={el => this.headers[column] = el}
          key={`header-${key}`}
          className={s.headCell}
          onDragStart={e => this.drag(e, key)}
          onDragOver={e => this.dragOver(e, key)}
          onDrop={e => this.drop(e, key)}
          onClick={() => this.onHeaderClick(column)}
          draggable
        >
          <strong className="mr-2">{this.props.headers[column]}</strong>
          <div
            className={s.resizeHandle}
            onClick={e => e.stopPropagation()}
            onMouseDown={e => {
              e.preventDefault();
              this.currentResizeKey = column;
              this.offset = this.headers[column].offsetWidth - e.pageX;
            }}
          />
          <Octicon icon={this.state.sorts[column] ? TriangleDown : TriangleUp} />
        </div>
      );
    });

    const actionsHeader = (
      <div
        key={`header-actions`}
        className={s.actionsCell}
      >
        <span>{' '}</span>
      </div>
    );

    return (
      <div
        ref={el => this.head = el}
        className={s.head}
      >
        <div className={s.row}>
          {[actionsHeader, ...cells]}
        </div>
      </div>
    )
  }

  renderBody() {
    const rows = get(this.props, 'data', []).map((item, key) => {
      
      const cells = Object.keys(this.state.columnOrder).map(index => {
        const col = this.state.columnOrder[index];
        return (
          <div
            key={`cell-${key}-${col}`}
            ref={el => {
              if (this.cells[col]) {
                this.cells[col][key] = el;
              } else {
                this.cells[col] = [el];
              }
            }}
            className={s.cell}
          >
            {item[col]}
          </div>
        )
      });

      const actions = (
        <div
          key={`cell-${key}-actions`}
          className={classnames(s.actionsCell, 'p2')}
        >
          <span
            className={classnames(s.action, 'mx-2')}
            onClick={e => {
              e.stopPropagation();
              this.props.onUpdate(item.id)
            }}
          >
            <Octicon icon={Pencil} />
          </span>
          <span
            className={classnames(s.action, 'mx-2')}
            onClick={e => {
              e.stopPropagation();
              this.props.onDelete(item.id)
            }}
          >
            <Octicon icon={Trashcan} />
          </span>
        </div>
      );

      return (
        <div
          key={`row-${key}`}
          className={s.row}
          onClick={() => this.props.onRowClick(item.id)}
        >
          {[actions, ...cells]}
        </div>
      );
    });
    return (
      <div
        ref={el => this.body = el}
        className={s.body}
      >
        {rows}
      </div>
    )
  }

  render() {
    return (
      <div className={s.wrapper}>
        <div className={classnames(this.props.className, s.table)}>
          {this.renderHead()}
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  headers: PropTypes.object,
  data: PropTypes.array,
  className: PropTypes.string,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onRowClick: PropTypes.func,
  onDrop: PropTypes.func,
  onSort: PropTypes.func,
  maxColumnWidth: PropTypes.number,
};

Grid.defaultProps = {
  data: {},
  maxColumnWidth: 500,
};

export default Grid;
