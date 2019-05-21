import React, { Component } from 'react';


class Toc extends Component {
  shouldComponentUpdate(newProps, newState){
    if (this.props.data === newProps.data) {
      return false;
    } else {
      return true;
    }
  }
  // 1.render 이전에 shouldComponentUpdate가 먼저 호출된다.
  // 2.shouldComponentUpdate의 return값이 true면 render가 호출되고 false면 render는 호출되지 않는다.
  // 3.새롭게 바뀐 값과 이전 값에 접근할 수 있다.
  render() {
    var data = this.props.data;
    var lists = [];
    var i = 0;
    while( i < data.length ) {
      lists.push(
      <li key={data[i].id}>
        <a 
        href={"/content/"+data[i].id}
        data-id={data[i].id}
        onClick={function(id, e){
          e.preventDefault();
          this.props.onChangePage(e.target.dataset.id);
          // this.props.onChangePage(id);
        }.bind(this, data[i].id)}
        // 바인드는 2번쨰로 인자를 함수의 첫번째 매개변수로 넣어준다.
        // 기존꺼는 한칸씩 뒤로 밀린다.
        >{data[i].title}
        </a>
      </li>)
      i = i + 1;
    }
    return(
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    )
  }
}


export default Toc;