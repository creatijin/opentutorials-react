import React, { Component } from 'react';
import Toc from "./components/Toc";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state={
      mode:"create",
      selected_content_id:1,
      welcome:{title:"welcome", desc:"Hello React!!!"},
      subject:{title:"WEB",subtxt:"world wide web!"},
      contents:[
        {id:1, title:'HTML', desc:'HTML is HyperText Markup Language.'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'Javascript', desc:'Javascript is for interactive'}
      ]
    }
  }
  render() {
    var _title, _desc, _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if ( this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.satate.contents
        this.max_content_id = this.max_content_id + 1 ;
  
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // )
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )
        //state에 값을 추가할때는 오리지널 데이터를 변경하는걸 쓰지말고 ex).push()
        //오리지널 데이터를 변경하지 않고 새로운 데이터를 추가하는걸 사용해라 ex).concat()
        this.setState({
          contents:_contents
        })
      }.bind(this)}></CreateContent>;
    }
    return (
      <div className="App">
        <Subject
        title={this.state.subject.title}
        subtxt={this.state.subject.subtxt}
        onChangePage={function(){
          this.setState({
            mode: 'welcome'
          });
        }.bind(this)}>
        </Subject>
        <Toc
         onChangePage={function(id){
          this.setState({
            mode: 'read',
            selected_content_id:Number(id)
          });
         }.bind(this)}
         data={this.state.contents}>
        </Toc>
        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          });
        }.bind(this)}></Control>
        {_article}
      </div>
    )
  }
}

export default App;
